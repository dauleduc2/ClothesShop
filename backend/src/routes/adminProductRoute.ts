import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { adminQueryPage } from "../interfaces/common/Query";
const router = express.Router();

//GET - get all order
router.get(
    "/",
    async (req: Request<null, null, null, adminQueryPage>, res: Response) => {
        //get connection
        const orderRepo = await getCustomRepository(OrderListRepository);
        const orderListWithCount = await orderRepo.getAllOrderList({
            limit: req.query.limit,
            page: req.query.page,
        });
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
