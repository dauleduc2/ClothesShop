import { OrderListStatus } from "../../entity/OrderList";

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
