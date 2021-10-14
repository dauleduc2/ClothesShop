import { EntityRepository, Repository } from "typeorm";
import { OrderList } from "../entity/OrderList";
@EntityRepository(OrderList)
export class OrderListRepository extends Repository<OrderList> {
    async addNewOrderList(OrderList: OrderList) {
        //save to db
        const result = await this.manager
            .save(OrderList)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async findByID(ID: string) {
        const OrderList = await this.findOne({ ID });
        return OrderList;
    }

    async findAllOrderList(userID: string) {
        const OrderList = await this.query(
            `SELECT ol.ID as orderID, ol.status, ol.createDate as date, COUNT(oi.ID) as totalProduct, SUM(oi.price * oi.amount) as totalPrice
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
        const result = await this.find({
            relations: ["orderItem"],
            where: {
                ID,
                user: userID,
            },
        });

        return result;
    }
}
