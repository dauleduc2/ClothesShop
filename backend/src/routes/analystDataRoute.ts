import { Request, Response } from "express";
import * as express from "express";
import { getManager } from "typeorm";
import { AdminQueryPage } from "../interfaces/common/Query";
import { ProductAnalyst } from "../interfaces/DTO/product";
import * as dataHelper from "../utils/dataHelper";
import { splitDateIntoEqualIntervals } from "../utils/dateHelper";

const router = express.Router();

//POST - get top 5 product hot sale between a time
router.post(
    "/product",
    async (
        req: Request<null, null, ProductAnalyst, AdminQueryPage>,
        res: Response
    ) => {
        const { from, to } = req.body;
        const fromDate = new Date(from);
        const toDate = new Date(to);

        const getTimeRange = splitDateIntoEqualIntervals(fromDate, toDate, 12);

        const data = await Promise.all(
            getTimeRange.map(async (time, index) => {
                if (index === getTimeRange.length - 1) {
                    return false;
                } else {
                    const endSplit = time.end.split("/");
                    time.end = `${endSplit[2]}-${endSplit[0]}-${endSplit[1]}`;
                    const startSplit = time.start.split("/");
                    time.start = `${startSplit[2]}-${startSplit[0]}-${startSplit[1]}`;
                    const res = await getManager()
                        .query(`SELECT SUM(t.totalSale) as totalSale
                                FROM (
                                    SELECT p.ID , SUM(oi.amount) as totalSale
                                    FROM product p
                                    LEFT JOIN order_item oi
                                        ON oi.productID = p.ID
                                    JOIN order_list ol
                                        ON ol.ID = oi.orderID
                                    WHERE (ol.status = "SHIPPING" OR ol.status = "DONE") AND date(ol.createDate) BETWEEN date('${time.start
                                        .split("/")
                                        .join("-")}') AND date('${time.end
                        .split("/")
                        .join("-")}')
                                    GROUP BY p.ID
                                )t
                            `);
                    return {
                        data: res[0].totalSale ? res[0].totalSale : 0,
                        time: time.start,
                    };
                }
            })
        );
        ``;
        data.pop();

        return res.send(
            dataHelper.getResponseForm(data, null, "get total sale success")
        );
    }
);

export default router;
