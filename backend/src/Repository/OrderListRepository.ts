import { EntityRepository, Repository } from "typeorm";
import { OrderList, OrderListStatus } from "../entity/OrderList";
import { AdminQueryPage } from "../interfaces/common/Query";
import { ResponseDataWithCount } from "../interfaces/common/Request";
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

    async findByID(ID: string, relation: Array<string>) {
        const OrderList = await this.findOne({ ID }, { relations: relation });
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

    async updateOrderListStatus(ID: string, status: OrderListStatus) {
        const result = await this.update({ ID }, { status });
        return result;
    }

    async getAllOrderList({
        limit,
        page,
    }: AdminQueryPage): Promise<
        ResponseDataWithCount<OrderListWithDetailUserDTO>
    > {
        const response = await this.findAndCount({
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
        let decoyOrderList = response[0] as any;
        decoyOrderList = decoyOrderList.map((orderList) => {
            const { password, ...ortherUserProps } = orderList.user;
            return {
                ...orderList,
                user: {
                    ...ortherUserProps,
                },
            };
        });

        return {
            data: decoyOrderList,
            count: response[1],
        };
    }
}
