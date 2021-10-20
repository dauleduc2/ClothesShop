import { color } from './color';
import { Product } from './product';
import { size } from './size';
import { User } from './user';

export enum OrderStatus {
    WAITING = 'waiting',
    SHIPPING = 'shipping',
    DONE = 'done',
    CANCEL = 'cancel',
}
export interface OrderItemToSend {
    amount: number;
    productID: string;
    sizeID: number;
    colorID: number;
}

export interface OrderListToSend {
    status: OrderStatus;
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
    status: OrderStatus;
    orderItem: OrderItem[];
    ID: string;
    createDate: string;
}

export interface ResponseOrder {
    orderID: string;
    status: OrderStatus;
    createDate: string;
    totalProduct: number;
    totalPrice: number;
}

export interface OrderListState {
    orderList: ResponseOrder[];
    currentList: OrderList;
    admin: {
        currentToShow: OrderListWithUserDetailDTO[];
    };
}

export interface OrderListWithUserDetailDTO extends OrderList {
    user: User;
}
