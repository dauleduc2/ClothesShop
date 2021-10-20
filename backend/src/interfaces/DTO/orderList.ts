import { OrderList, OrderListStatus } from "../../entity/OrderList";
import { User } from "../../entity/User";

export interface OrderItemRequestDTO {
    amount: number;
    price: number;
    createDate: Date;
    productID: string;
    sizeID: string;
    colorID: string;
}

export interface RequestWithOrderListDTO {
    orderItem: OrderItemRequestDTO[];
    status: OrderListStatus;
}

export interface OrderListWithDetailUserDTO extends Omit<OrderList, "user"> {
    user: User;
}
