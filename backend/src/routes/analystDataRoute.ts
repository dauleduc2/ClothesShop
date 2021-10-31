import { Request, Response } from "express";
import * as express from "express";
import { AdminQueryPage } from "../interfaces/common/Query";
import {
    GetEachProductAnalyst,
    ProductAnalyst,
} from "../interfaces/DTO/product";
import * as dataHelper from "../utils/dataHelper";
import { splitDateIntoEqualIntervals } from "../utils/dateHelper";
import {
    getTotalItemByTypeOnTime,
    getTotalItemOfProductOnTime,
    getTotalItemOnTime,
    getTotalPriceByTypeOnTime,
    getTotalPriceOnTime,
} from "../query/analyst";

const router = express.Router();

//POST - get total item sale on time
router.post(
    "/getTotalItem",
    async (
        req: Request<null, null, ProductAnalyst, AdminQueryPage>,
        res: Response
    ) => {
        const { from, to } = req.body;

        const getTimeRange = splitDateIntoEqualIntervals(
            new Date(from),
            new Date(to),
            12
        );

        const data = await Promise.all(
            getTimeRange.map(async (time) => {
                const res = await getTotalItemOnTime(time);
                return {
                    data: res[0].totalSale ? res[0].totalSale : 0,
                    time: `${new Date(time.start).toLocaleDateString(
                        "en-GB"
                    )} - ${new Date(time.end).toLocaleDateString("en-GB")}`,
                };
            })
        );
        ``;

        return res.send(
            dataHelper.getResponseForm(
                data,
                null,
                "get total sale item success"
            )
        );
    }
);
//POST - get total price on time
router.post(
    "/getTotalPrice",
    async (
        req: Request<null, null, ProductAnalyst, AdminQueryPage>,
        res: Response
    ) => {
        const { from, to } = req.body;
        const fromDate = new Date(from);
        const toDate = new Date(to);

        const getTimeRange = splitDateIntoEqualIntervals(fromDate, toDate, 12);

        const data = await Promise.all(
            getTimeRange.map(async (time) => {
                const res = await getTotalPriceOnTime(time);
                return {
                    data: res[0].totalPrice ? res[0].totalPrice : 0,
                    time: `${new Date(time.start).toLocaleDateString(
                        "en-GB"
                    )} - ${new Date(time.end).toLocaleDateString("en-GB")}`,
                };
            })
        );
        ``;

        return res.send(
            dataHelper.getResponseForm(data, null, "get total price success")
        );
    }
);

//POST - get total item by category on time
router.post(
    "/getTotalItemByCategory",
    async (
        req: Request<null, null, ProductAnalyst, AdminQueryPage>,
        res: Response
    ) => {
        const { from, to } = req.body;

        const data = await getTotalItemByTypeOnTime({ start: from, end: to });

        return res.send(
            dataHelper.getResponseForm(
                data,
                null,
                "get total item by category success"
            )
        );
    }
);
//POST - get total price by category on time
router.post(
    "/getTotalPriceByCategory",
    async (
        req: Request<null, null, ProductAnalyst, AdminQueryPage>,
        res: Response
    ) => {
        const { from, to } = req.body;

        const data = await getTotalPriceByTypeOnTime({ start: from, end: to });

        return res.send(
            dataHelper.getResponseForm(
                data,
                null,
                "get total price by category success"
            )
        );
    }
);
//POST - get total item of product
router.post(
    "/getEachProductAnalyst",
    async (
        req: Request<null, null, GetEachProductAnalyst, null>,
        res: Response
    ) => {
        const { from, to, ID } = req.body;
        const getTimeRange = splitDateIntoEqualIntervals(
            new Date(from),
            new Date(to),
            12
        );

        const data = await Promise.all(
            getTimeRange.map(async (time) => {
                const res = await getTotalItemOfProductOnTime({ ...time, ID });
                return {
                    data: res[0] ? res[0].totalItem : 0,
                    time: `${new Date(time.start).toLocaleDateString(
                        "en-GB"
                    )} - ${new Date(time.end).toLocaleDateString("en-GB")}`,
                };
            })
        );
        ``;

        return res.send(
            dataHelper.getResponseForm(
                data,
                null,
                "get total price by category success"
            )
        );
    }
);

export default router;
