import { Request, Response } from "express";
import * as express from "express";
import { getCustomRepository } from "typeorm";
import * as dataHelper from "../utils/dataHelper";
import { OrderListRepository } from "../Repository/OrderListRepository";
import { ServerRequest } from "../interfaces/common/Request";
import { UpdateOrderListStatusDTO } from "../interfaces/DTO/orderList";
import { validateUpdateOrderList } from "../validators/OrderList";

const router = express.Router();
//GET - get all orderList

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
            res.status(400).send(
                dataHelper.getResponseForm(null, errorToSend, "validate error")
            );
        }
        //get connection
        const orderRepo = await getCustomRepository(OrderListRepository);
        const result = await orderRepo.updateOrderListStatus(
            req.body.ID,
            req.body.status
        );

        return res.send(
            dataHelper.getResponseForm(
                result,
                null,
                "get all order list success!"
            )
        );
    }
);

export default router;
