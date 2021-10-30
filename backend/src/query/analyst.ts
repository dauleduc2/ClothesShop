import { getManager } from "typeorm";
import { StartEndInDay } from "../interfaces/common/dateTime";

export const getTotalItemOnTime = async (time: StartEndInDay) => {
    return await getManager().query(`SELECT SUM(t.totalSale) as totalSale
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
};
export const getTotalPriceOnTime = async (time: StartEndInDay) => {
    return await getManager().query(`
                                        SELECT SUM(t.totalPrice) as totalPrice
                                        FROM (
                                            SELECT p.ID , p.name, SUM(oi.amount*oi.price) as totalPrice
                                            FROM product p
                                            LEFT JOIN order_item oi
                                                ON oi.productID = p.ID
                                            JOIN order_list ol
                                                ON ol.ID = oi.orderID
                                            WHERE (ol.status = "SHIPPING" OR ol.status = "DONE") AND date(ol.createDate) BETWEEN date('${time.start
                                                .split("/")
                                                .join(
                                                    "-"
                                                )}') AND date('${time.end
        .split("/")
        .join("-")}') 
                                            GROUP BY p.ID
                                        )t;
                                     `);
};
