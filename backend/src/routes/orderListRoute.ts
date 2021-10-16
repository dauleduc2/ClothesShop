import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import validateOrderList from "../validators/OrderList";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { UserRepository } from "../Repository/UserRepository";
import { RequestWithOrderListDTO } from "../interfaces/DTO/orderList";
import { ProductRepository } from "../Repository/ProductRepository";
import { OrderList } from "../entity/OrderList";
import { Product } from "../entity/Product";
import { OrderItem } from "../entity/OrderItem";
import { RequestWithUser } from "../interfaces/common/Request";
import * as statusCode from "../constants/statusConstants";
const router = express.Router();

//GET order list by orderID
router.get(
    "/:orderID",
    [authenMiddleware],
    async (req: RequestWithUser<any>, res: Response) => {
        const { orderID } = req.params;

        //get connection
        const connection = await Promise.all<any>([
            getCustomRepository(OrderListRepository),
        ]);
        const orderListRepo: OrderListRepository = connection[0];

        const result = await orderListRepo.findOrderListByID(
            req.user.ID,
            orderID
        );
        return res.send(
            dataHelper.getResponseForm(result, null, "get order list!")
        );
    }
);

//GET all order list
router.get(
    "/",
    [authenMiddleware],
    async (req: RequestWithUser<any>, res: Response) => {
        //get connection
        const orderListRepo = await getCustomRepository(OrderListRepository);
        const result = await orderListRepo.findAllOrderList(req.user.ID);
        return res.send(
            dataHelper.getResponseForm(result, null, "get order list!")
        );
    }
);

//POST add new order list
router.post(
    "/",
    [authenMiddleware],
    async (req: RequestWithUser<RequestWithOrderListDTO>, res: Response) => {
        //validate
        const { error } = validateOrderList(req.body);
        const { orderItem, status } = req.body;
        if (error)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        error.details,
                        "validation error"
                    )
                );
        //create new order list
        let orderList = new OrderList();
        orderList.user = req.user.ID;
        orderList.status = status;
        //get connection
        const connection = await Promise.all<any>([
            getCustomRepository(UserRepository),
            getCustomRepository(ProductRepository),
            getCustomRepository(OrderListRepository),
        ]);

        const userRepo: UserRepository = connection[0];
        const productRepo: ProductRepository = connection[1];
        const orderListRepo: OrderListRepository = connection[2];
        //check existed userID
        const isDuplicate = await userRepo.findByID(req.user.ID);
        if (!isDuplicate)
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        null,
                        "There no user with this ID in database"
                    )
                );

        //check existed productID
        const productItemList = Promise.all<Product>(
            orderItem.map((item) => productRepo.findByID(item.productID))
        );

        const productList = await productItemList;
        orderList.orderItem = await Promise.all<OrderItem>(
            orderItem.map((item, index) => {
                let newOrderItem = new OrderItem();
                newOrderItem.amount = item.amount;
                newOrderItem.price = productList[index].price;
                newOrderItem.product = productList[index];
                newOrderItem.size = item.sizeID;
                newOrderItem.color = item.colorID;
                return newOrderItem;
            })
        );
        //add new orderList
        const result = await orderListRepo.addNewOrderList(orderList);

        return res
            .status(statusCode.CREATED)
            .send(
                dataHelper.getResponseForm(
                    result,
                    null,
                    "add new orderList success!"
                )
            );
    }
);
export default router;
