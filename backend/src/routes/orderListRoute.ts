import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
import validateOrderList from "../validators/OrderList";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { UserRepository } from "../Repository/UserRepository";
import { RequestWithOrderList } from "../interfaces/requestWithOrderList";
import { ProductRepository } from "../Repository/ProductRepository";
import { OrderList } from "../entity/OrderList";
import { Product } from "../entity/Product";
import { OrderItem } from "../entity/OrderItem";
const router = express.Router();

//GET
router.get("/", async (req: Request, res: Response) => {
    //get connection

    return res
        .status(200)
        .send(dataHelper.getResponseForm(null, null, "get order list!"));
});

//POST
router.post(
    "/",
    [authenMiddleware],
    async (req: RequestWithOrderList, res: Response) => {
        //validate
        const { error } = validateOrderList(req.body);
        const { orderItem, user, status } = req.body;
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
        orderList.user = user;
        orderList.status = status;

        //get connection
        const userRepo = await getCustomRepository(UserRepository);
        const productRepo = await getCustomRepository(ProductRepository);
        const orderListRepo = await getCustomRepository(OrderListRepository);
        //check existed userID
        const isDuplicate = await userRepo.findByID(req.body.user);
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
            orderItem.map((item) => productRepo.findByID(item.product))
        );
        const productList = await productItemList;
        orderList.orderItem = await Promise.all<OrderItem>(
            orderItem.map((item, index) => {
                let newOrderItem = new OrderItem();
                newOrderItem.amount = item.amount;
                newOrderItem.price = productList[index].price;
                newOrderItem.product = productList[index];
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
