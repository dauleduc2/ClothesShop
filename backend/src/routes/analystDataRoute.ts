import { Request, Response } from "express";
import * as express from "express";
import { getConnection, getManager } from "typeorm";
import { AdminQueryPage } from "../interfaces/common/Query";
import { Product } from "../entity/Product";
import { generateRanges } from "../utils/dateHelper";
import { DateProps, DateTime } from "../interfaces/common/dateTime";
import { ProductAnalyst } from "../interfaces/DTO/product";
import * as dataHelper from "../utils/dataHelper";
import { extendMoment } from "moment-range";
import moment = require("moment");

const momentExtends = extendMoment(moment);
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
        const splitDateIntoEqualIntervals = (
            startDate: Date,
            endDate: Date,
            numberOfIntervals: number
        ): { start: string; end: string }[] => {
            const intervalLength =
                (endDate.getTime() - startDate.getTime()) / numberOfIntervals;
            return [...new Array(numberOfIntervals)].map((e, i) => {
                return {
                    start: new Date(
                        startDate.getTime() + i * intervalLength
                    ).toLocaleDateString(),
                    end: new Date(
                        startDate.getTime() + (i + 1) * intervalLength
                    ).toLocaleDateString(),
                };
            });
        };
        const getTimeRange = splitDateIntoEqualIntervals(fromDate, toDate, 12);

        // console.log(from, to);
        // const getTimeRange = generateRanges(
        //     from.split("-").reverse().join("/"),
        //     to.split("-").reverse().join("/")
        // ) as DateTime[];

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
