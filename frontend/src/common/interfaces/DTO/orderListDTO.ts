import { OrderList } from '../Model/OrderList';
import { User } from '../Model/User';
import { OrderItemToSendDTO } from './orderItemDTO';

export interface OrderListToSendDTO extends Pick<OrderList, 'status' | 'address' | 'phoneNumber'> {
    orderItem: OrderItemToSendDTO[];
}

export interface ResponseOrderDTO extends Pick<OrderList, 'status' | 'createDate' | 'address' | 'phoneNumber'> {
    orderID: string;
    totalProduct: number;
    totalPrice: number;
}

export interface OrderListWithUserDetailDTO extends OrderList {
    user: User;
}

export interface UpdateStatusResponseDTO extends Pick<OrderList, 'ID' | 'status'> {}
