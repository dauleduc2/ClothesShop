import { EntityRepository, Repository } from "typeorm";
import { OrderList } from "../entity/OrderList";
import { OrderListWithDetailUserDTO } from "../interfaces/DTO/orderList";
@EntityRepository(OrderList)
export class OrderListRepository extends Repository<OrderList> {
    async addNewOrderList(OrderList: OrderList) {
        //save to db
        const res: OrderList = await this.manager
            .save(OrderList)
            .catch((err) => err.sqlMessage);

        return res;
    }

    async findByID(ID: string) {
        const OrderList = await this.findOne({ ID });
        return OrderList;
    }

    async findAllOrderListWithUser(userID: string) {
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

    async findOrderListByIDWithUser(userID: string, ID: string) {
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

    async getAllOrderList(limit: number, page: number) {
        const result = await this.find({
            relations: [
                "user",
                "orderItem",
                "orderItem.product",
                "orderItem.size",
                "orderItem.color",
            ],
            order: {
                createDate: "DESC",
            },
            take: limit,
            skip: (page - 1) * limit,
        });
        let decoyOrderList = result as any;
        decoyOrderList = decoyOrderList.map((orderList) => {
            const { password, ...ortherUserProps } = orderList.user;
            return {
                ...orderList,
                user: {
                    ...ortherUserProps,
                },
            };
        });

        return decoyOrderList;
    }
}
