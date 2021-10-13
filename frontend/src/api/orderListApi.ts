import { ServerResponse } from './../common/interfaces/api';
import axiosClient from '../axios/config';
import { OrderList, OrderListToSend } from '../common/interfaces/orderList';

export const orderListApi = {
    addNewOrderList: async (orderList: OrderListToSend) => {
        const url = '/api/orderlist';
        return await axiosClient.post<ServerResponse<OrderList>>(url, orderList);
    },
};
