import { OrderList, OrderStatusString } from '../Model/OrderList';
import { User } from '../Model/User';
import { OrderItemToSend } from './orderItemDTO';

export interface OrderListToSendDTO {
    status: OrderStatusString;
    orderItem: OrderItemToSend[];
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

export interface OrderListWithUserDetailDTO extends OrderList {
    user: User;
}

export interface UpdateStatusResponseDTO {
    ID: string;
    status: OrderStatusString;
}
