import { Request } from "express";
import { OrderItem } from "../entity/OrderItem";

export interface OrderItemRequest {
    ID?: string;
    amount: number;
    price: number;
    createDate: Date;
    product: string;
}

export interface RequestWithOrderListBody {
    ID?: string;
    user: string;
    orderItem?: OrderItemRequest[];
    status?: number;
    createDate?: Date;
}

export interface RequestWithOrderList extends Request {
    body: RequestWithOrderListBody;
}
