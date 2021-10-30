import { Request, Response } from "express";
import * as express from "express";
import { AdminQueryPage } from "../interfaces/common/Query";
import { ProductAnalyst } from "../interfaces/DTO/product";
import * as dataHelper from "../utils/dataHelper";
import { splitDateIntoEqualIntervals } from "../utils/dateHelper";
import {
    getTotalItemByTypeOnTime,
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
        const fromDate = new Date(from);
        const toDate = new Date(to);

        const getTimeRange = splitDateIntoEqualIntervals(fromDate, toDate, 12);

        const data = await Promise.all(
            getTimeRange.map(async (time) => {
                const endSplit = time.end.split("/");
                time.end = `${endSplit[2]}-${endSplit[0]}-${endSplit[1]}`;
                const startSplit = time.start.split("/");
                time.start = `${startSplit[2]}-${startSplit[0]}-${startSplit[1]}`;
                const res = await getTotalItemOnTime(time);
                return {
                    data: res[0].totalSale ? res[0].totalSale : 0,
                    time: `${startSplit[1]}/${startSplit[0]}/${startSplit[2]} - ${endSplit[1]}/${endSplit[0]}/${endSplit[2]}`,
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
                const endSplit = time.end.split("/");
                time.end = `${endSplit[2]}-${endSplit[0]}-${endSplit[1]}`;
                const startSplit = time.start.split("/");
                time.start = `${startSplit[2]}-${startSplit[0]}-${startSplit[1]}`;
                const res = await getTotalPriceOnTime(time);
                return {
                    data: res[0].totalPrice ? res[0].totalPrice : 0,
                    time: `${startSplit[1]}/${startSplit[0]}/${startSplit[2]} - ${endSplit[1]}/${endSplit[0]}/${endSplit[2]}`,
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

export default router;
