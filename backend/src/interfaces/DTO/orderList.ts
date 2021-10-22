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
    address: string;
    phoneNumber: string;
}

export interface OrderListWithDetailUserDTO extends Omit<OrderList, "user"> {
    user: Partial<User>;
}

export interface UpdateOrderListStatusDTO {
    status: OrderListStatus;
    ID: string;
}
