import { OrderItem } from "./../../entity/OrderItem";
import { OrderList } from "../../entity/OrderList";
import { User } from "../../entity/User";

export interface OrderItemRequestDTO
    extends Pick<OrderItem, "amount" | "price" | "createDate"> {
    productID: string;
    sizeID: number;
    colorID: number;
}

export interface RequestWithOrderListDTO
    extends Pick<OrderList, "status" | "address" | "phoneNumber"> {
    orderItem: OrderItemRequestDTO[];
}

export interface OrderListWithDetailUserDTO extends Omit<OrderList, "user"> {
    user: Partial<User>;
}

export interface UpdateOrderListStatusDTO
    extends Pick<OrderList, "status" | "ID"> {}
