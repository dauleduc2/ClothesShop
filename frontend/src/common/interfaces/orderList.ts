import { color } from './color';
import { Product } from './product';
import { size } from './size';

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
    size: size;
    color: color;
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

export interface ResponseOrder {
    orderID: string;
    status: number;
    createDate: string;
    totalProduct: number;
    totalPrice: number;
}

export interface OrderListState {
    orderList: ResponseOrder[];
    currentList: OrderList;
}
