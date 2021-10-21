import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderListApi } from '../../api/orderListApi';
import { OrderListToSend, OrderStatusString } from '../../common/interfaces/orderList';
export const orderListThunk = {
    addOrderList: createAsyncThunk('orderList/addOrderList', async (orderList: OrderListToSend) => {
        const res = await orderListApi.addNewOrderList(orderList);
        return res.data.data;
    }),
    getAllOrderList: createAsyncThunk('orderList/getAllOrderList', async () => {
        const res = await orderListApi.getAllOrderList();
        return res.data.data;
    }),
    getOrderListById: createAsyncThunk('orderList/getOrderListById', async (orderID: string) => {
        const res = await orderListApi.getOrderListById(orderID);
        return res.data.data;
    }),
    adminGetAllOrderList: createAsyncThunk(
        'orderList/adminGetAllOrderList',
        async ({ limit, page }: { limit: number; page: number }) => {
            const res = await orderListApi.adminGetAllOrderList(limit, page);
            return res.data.data;
        }
    ),
    adminUpdateStatusOfOrderList: createAsyncThunk(
        'orderList/adminUpdateStatusOfOrderList',
        async ({ ID, status }: { ID: string; status: OrderStatusString }) => {
            await orderListApi.adminUpdateStatusOfOrderList(ID, status);
            return { ID, status };
        }
    ),
};
