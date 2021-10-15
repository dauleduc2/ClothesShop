import { ServerResponse } from './../common/interfaces/api';
import axiosClient from '../axios/config';
import { OrderListToSend, ResponseOrder } from '../common/interfaces/orderList';

export const orderListApi = {
    addNewOrderList: async (orderList: OrderListToSend) => {
        const url = '/api/orderlist';
        return await axiosClient.post<ServerResponse<ResponseOrder>>(url, orderList);
    },
    getAllOrderList: async () => {
        const url = '/api/orderlist';
        return await axiosClient.get<ServerResponse<ResponseOrder[]>>(url);
    },
};
