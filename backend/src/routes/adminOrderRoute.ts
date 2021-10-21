import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { ResponseDataWithCount } from "../interfaces/common/Request";
import { OrderListWithDetailUserDTO } from "../interfaces/DTO/orderList";

const router = express.Router();
//GET - get all orderList

interface GetOrderListQuery {
    limit: number;
    page: number;
}

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

export default router;
