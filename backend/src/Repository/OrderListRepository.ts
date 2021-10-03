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
}
