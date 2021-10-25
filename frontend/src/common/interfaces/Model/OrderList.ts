import { OrderItem } from './OrderItem';

export enum OrderStatus {
    WAITING = 'WAITING',
    SHIPPING = 'SHIPPING',
    DONE = 'DONE',
    CANCEL = 'CANCEL',
}

export type OrderStatusString = keyof typeof OrderStatus;
export interface OrderList {
    status: OrderStatusString;
    orderItem: OrderItem[];
    ID: string;
    createDate: string;
    address: string;
    phoneNumber: string;
}
