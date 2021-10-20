import { ServerResponse } from './../common/interfaces/api';
import axiosClient from '../axios/config';
import { OrderList, OrderListToSend, OrderListWithUserDetailDTO, ResponseOrder } from '../common/interfaces/orderList';

export const orderListApi = {
    addNewOrderList: async (orderList: OrderListToSend) => {
        const url = '/api/orderlist';
        return await axiosClient.post<ServerResponse<ResponseOrder>>(url, orderList);
    },
    getAllOrderList: async () => {
        const url = '/api/orderlist';
        return await axiosClient.get<ServerResponse<ResponseOrder[]>>(url);
    },
    getOrderListById: async (orderID: string) => {
        const url = `/api/orderList/${orderID}`;
        return await axiosClient.get<ServerResponse<OrderList>>(url);
    },
    adminGetAllOrderList: async (limit: string, page: string) => {
        const url = `/api/admin/order?limit=${limit}&page=${page}`;
        return await axiosClient.get<ServerResponse<OrderListWithUserDetailDTO[]>>(url);
    },
};
