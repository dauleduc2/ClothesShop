import { EntityRepository, Repository } from "typeorm";
import { OrderList } from "../entity/OrderList";
@EntityRepository(OrderList)
export class OrderListRepository extends Repository<OrderList> {
    async addNewOrderList(OrderList: OrderList) {
        //save to db
        const res: OrderList = await this.manager
            .save(OrderList)
            .catch((err) => err.sqlMessage);
        // const result: ResponseOrder = {
        //     orderID: res.ID,
        //     status: res.status,
        //     createDate: res.createDate,
        //     totalProduct: res.orderItem.reduce((total, current) => {
        //         return total + current.amount;
        //     }, 0),
        //     totalPrice: res.orderItem.reduce((total, current) => {
        //         return total + current.price * current.amount;
        //     }, 0),
        // };
        return res;
    }

    async findByID(ID: string) {
        const OrderList = await this.findOne({ ID });
        return OrderList;
    }

    async findAllOrderList(userID: string) {
        const OrderList = await this.query(
            `SELECT ol.ID as orderID, ol.status, ol.createDate as createDate, SUM(oi.amount) as totalProduct, SUM(oi.price * oi.amount) as totalPrice
                    FROM order_list ol
                    JOIN order_item oi
                        ON ol.ID = oi.orderID
                    WHERE ol.userID = ?
                    GROUP BY ol.ID 
                    ORDER BY ol.createDate DESC`,
            [userID]
        );
        return OrderList;
    }

    async findOrderListByID(userID: string, ID: string) {
        const result: OrderList = await this.findOne({
            relations: [
                "orderItem",
                "orderItem.product",
                "orderItem.size",
                "orderItem.color",
            ],
            where: {
                ID,
                user: userID,
            },
        });

        return result;
    }
}
