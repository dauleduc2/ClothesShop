import { getManager } from "typeorm";
import {
    GetTotalItemOfProductOnTime,
    StartEndInDay,
} from "../interfaces/common/dateTime";

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

export const getTotalItemByTypeOnTime = async (time: StartEndInDay) => {
    return await getManager().query(`
        SELECT t.name, SUM(oi.amount) as totalItem
        FROM type t
        LEFT JOIN product_types_type pt
            ON t.ID = pt.typeID
        JOIN order_item oi
            ON pt.productID = oi.productID
        WHERE date(oi.createDate)  BETWEEN date('${time.start
            .split("/")
            .join("-")}') AND date('${time.end.split("/").join("-")}') 
        GROUP BY t.ID 
        LIMIT 5;
    `);
};
export const getTotalPriceByTypeOnTime = async (time: StartEndInDay) => {
    return await getManager().query(`
        SELECT t.name, SUM(oi.amount*oi.price) as totalPrice
        FROM type t
        LEFT JOIN product_types_type pt
            ON t.ID = pt.typeID
        JOIN order_item oi
            ON pt.productID = oi.productID
        WHERE date(oi.createDate)  BETWEEN date('${time.start
            .split("/")
            .join("-")}') AND date('${time.end.split("/").join("-")}') 
        GROUP BY t.ID 
        LIMIT 5;
    `);
};
export const getTotalItemOfProductOnTime = async (
    time: GetTotalItemOfProductOnTime
) => {
    return await getManager().query(`
        SELECT p.name , SUM(oi.amount) as totalItem
        FROM order_item oi
        JOIN product p
            ON oi.productID = p.ID
        WHERE date(oi.createDate)  BETWEEN date('${time.start}') AND date('${time.end}') AND p.ID = '${time.ID}'
        GROUP BY p.ID
    `);
};
