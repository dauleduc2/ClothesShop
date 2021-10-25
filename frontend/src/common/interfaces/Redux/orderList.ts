import { OrderListWithUserDetailDTO, ResponseOrderDTO } from '../DTO/orderListDTO';
import { OrderList } from '../Model/OrderList';

export interface OrderListState {
    orderList: ResponseOrderDTO[];
    currentList: OrderList;
    admin: {
        currentToShow: OrderListWithUserDetailDTO[];
        count: number;
    };
}
