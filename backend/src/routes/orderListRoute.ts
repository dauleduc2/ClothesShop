import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import validateOrderList from "../validators/OrderList";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { UserRepository } from "../Repository/UserRepository";
import { RequestWithOrderList } from "../interfaces/orderList";
import { ProductRepository } from "../Repository/ProductRepository";
import { OrderList } from "../entity/OrderList";
import { Product } from "../entity/Product";
import { OrderItem } from "../entity/OrderItem";
import { RequestWithUser } from "../interfaces/user";
const router = express.Router();

//GET all order list
router.get("/", async (req: Request, res: Response) => {
    //get connection
    const orderListRepo = await getCustomRepository(OrderListRepository);
    const result = await orderListRepo.findAllOrderList();

    return res
        .status(200)
        .send(dataHelper.getResponseForm(result, null, "get order list!"));
});
//GET all order list
router.get("/:orderID", async (req: Request, res: Response) => {
    const { orderID } = req.params;

    //get connection
    const orderListRepo = await getCustomRepository(OrderListRepository);
    const result = await orderListRepo.findOrderListByID(orderID);

    return res
        .status(200)
        .send(dataHelper.getResponseForm(result, null, "get order list!"));
});
//POST add new order list
router.post(
    "/",
    [authenMiddleware],
    async (req: RequestWithUser<RequestWithOrderList>, res: Response) => {
        //validate
        const { error } = validateOrderList(req.body);
        const { orderItem, status } = req.body;
        if (error)
            return res
                .status(400)
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
        const userRepo = await getCustomRepository(UserRepository);
        const productRepo = await getCustomRepository(ProductRepository);
        const orderListRepo = await getCustomRepository(OrderListRepository);
        //check existed userID
        const isDuplicate = await userRepo.findByID(req.user.ID);
        if (!isDuplicate)
            return res
                .status(400)
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
            .status(200)
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
