import { color } from './color';
import { Product } from './product';
import { size } from './size';
import { User } from './user';

export enum OrderStatus {
    WAITING = 'WAITING',
    SHIPPING = 'SHIPPING',
    DONE = 'DONE',
    CANCEL = 'CANCEL',
}

export type OrderStatusString = keyof typeof OrderStatus;
export interface OrderItemToSend {
    amount: number;
    productID: string;
    sizeID: number;
    colorID: number;
}

export interface OrderListToSend {
    status: OrderStatusString;
    orderItem: OrderItemToSend[];
    address: string;
    phoneNumber: string;
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
    status: OrderStatusString;
    orderItem: OrderItem[];
    ID: string;
    createDate: string;
    address: string;
    phoneNumber: string;
}

export interface ResponseOrderDTO {
    orderID: string;
    status: OrderStatusString;
    createDate: string;
    totalProduct: number;
    totalPrice: number;
    address: string;
    phoneNumber: string;
}

export interface OrderListState {
    orderList: ResponseOrderDTO[];
    currentList: OrderList;
    admin: {
        currentToShow: OrderListWithUserDetailDTO[];
        count: number;
    };
}

export interface OrderListWithUserDetailDTO extends OrderList {
    user: User;
}

export interface ShipmentDetailDTO extends Pick<User, 'address' | 'phoneNumber'> {}

export interface UpdateStatusResponseDTO {
    ID: string;
    status: OrderStatusString;
}
