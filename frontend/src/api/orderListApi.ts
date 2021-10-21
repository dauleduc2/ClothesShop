import { ServerResponse } from './../common/interfaces/api';
import axiosClient from '../axios/config';
import {
    OrderList,
    OrderListToSend,
    OrderListWithUserDetailDTO,
    OrderStatusString,
    ResponseOrder,
} from '../common/interfaces/orderList';
import { ResponseWithCount } from '../common/interfaces/Common/response';

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
    adminGetAllOrderList: async (limit: number, page: number) => {
        const url = `/api/admin/order?limit=${limit}&page=${page}`;
        return await axiosClient.get<ServerResponse<ResponseWithCount<OrderListWithUserDetailDTO[]>>>(url);
    },
    adminUpdateStatusOfOrderList: async (ID: string, status: OrderStatusString) => {
        const url = `/api/admin/order/status`;
        return await axiosClient.post<ServerResponse<any>>(url, { ID, status });
    },
};
