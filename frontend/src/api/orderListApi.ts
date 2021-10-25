import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import {
    OrderListToSendDTO,
    OrderListWithUserDetailDTO,
    ResponseOrderDTO,
} from '../common/interfaces/DTO/orderListDTO';
import { ResponseWithCount } from '../common/interfaces/Common/response';
import { OrderList, OrderStatusString } from '../common/interfaces/Model/OrderList';

export const orderListApi = {
    addNewOrderList: async (orderList: OrderListToSendDTO) => {
        const url = '/api/orderlist';
        return await axiosClient.post<ServerResponse<ResponseOrderDTO>>(url, orderList);
    },
    getAllOrderList: async () => {
        const url = '/api/orderlist';
        return await axiosClient.get<ServerResponse<ResponseOrderDTO[]>>(url);
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
        const result = await axiosClient.post<ServerResponse<any>>(url, { ID, status });
        return result;
    },
};
