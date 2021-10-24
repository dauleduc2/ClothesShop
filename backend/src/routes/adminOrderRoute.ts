import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { ServerRequest } from "../interfaces/common/Request";
import { UpdateOrderListStatusDTO } from "../interfaces/DTO/orderList";
import { validateUpdateOrderList } from "../validators/OrderList";
import { ProductRepository } from "../Repository/ProductRepository";
import * as statusCode from "../constants/statusConstants";
const router = express.Router();

interface GetOrderListQuery {
    limit: number;
    page: number;
}
//GET - get all order
router.get(
    "/",
    async (
        req: Request<null, null, null, GetOrderListQuery>,
        res: Response
    ) => {
        //get connection
        const orderRepo = await getCustomRepository(OrderListRepository);
        const orderListWithCount = await orderRepo.getAllOrderList(
            req.query.limit,
            req.query.page
        );
        return res.send(
            dataHelper.getResponseForm(
                orderListWithCount,
                null,
                "get all order list success!"
            )
        );
    }
);

//POST - update status
router.post(
    "/status",
    async (req: ServerRequest<UpdateOrderListStatusDTO>, res: Response) => {
        //validate
        const { error } = validateUpdateOrderList(req.body.status, req.body.ID);
        if (error) {
            let errorToSend = {};
            error.details.forEach((detailError) => {
                errorToSend[`${detailError.path[0]}`] = detailError.message;
            });
            return res
                .status(statusCode.BAD_REQUEST)
                .send(
                    dataHelper.getResponseForm(
                        null,
                        errorToSend,
                        "validate error"
                    )
                );
        }
        //get connection
        const connection = await Promise.all<any>([
            getCustomRepository(OrderListRepository),
            getCustomRepository(ProductRepository),
        ]);

        const orderRepo = connection[0] as OrderListRepository;
        const productRepo = connection[1] as ProductRepository;

        const orderList = await orderRepo.findByID(req.body.ID, [
            "orderItem",
            "orderItem.product",
        ]);
        const currentStatus = orderList.status;

        if (
            (currentStatus === "WAITING" || currentStatus === "CANCEL") &&
            (req.body.status === "DONE" || req.body.status === "SHIPPING")
        ) {
            //get the name of product that out of stock
            let outOfStock = [];
            //check is all of product in order is in stock or not, if not push product name on outOfStock
            await Promise.all(
                orderList.orderItem.map((orderItem) => {
                    return productRepo
                        .checkQuantityOfProduct(
                            orderItem.product.ID,
                            orderItem.amount
                        )
                        .catch((name) => outOfStock.push(name));
                })
            );
            //check is any product is out of stock then return
            if (outOfStock.length > 0) {
                return res.status(statusCode.BAD_REQUEST).send(
                    dataHelper.getResponseForm(
                        false,
                        {
                            message: `${outOfStock.join(
                                " ,"
                            )} is out of stock with this quantity`,
                        },
                        "out of stock message!"
                    )
                );
            }
            //minus on db
            await Promise.all(
                orderList.orderItem.map((orderItem) => {
                    return productRepo.minusQuantityProduct(
                        orderItem.product.ID,
                        orderItem.amount
                    );
                })
            );
        }

        if (
            (currentStatus === "DONE" || currentStatus === "SHIPPING") &&
            (req.body.status === "WAITING" || req.body.status === "CANCEL")
        ) {
            //add on db
            await Promise.all(
                orderList.orderItem.map((orderItem) => {
                    return productRepo.addQuantityProduct(
                        orderItem.product.ID,
                        orderItem.amount
                    );
                })
            );
        }

        await orderRepo.updateOrderListStatus(req.body.ID, req.body.status);

        return res.send(
            dataHelper.getResponseForm(
                null,
                null,
                "update status of order list success!"
            )
        );
    }
);

export default router;
