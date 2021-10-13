import { Product } from './product';

export interface OrderItemToSend {
    amount: number;
    productID: string;
    sizeID: number;
    colorID: number;
}

export interface OrderListToSend {
    status: number;
    orderItem: OrderItemToSend[];
}

export interface OrderItem {
    amount: number;
    price: 10;
    size: number;
    color: number;
    ID: string;
    createDate: string;
    product: Partial<Product>;
}

export interface OrderList {
    status: number;
    orderItem: OrderItem[];
    ID: string;
    createDate: string;
}
