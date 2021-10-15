import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderListApi } from '../../api/orderListApi';
import { OrderListToSend } from '../../common/interfaces/orderList';
export const orderListThunk = {
    addOrderList: createAsyncThunk('orderList/addOrderList', async (orderList: OrderListToSend) => {
        const res = await orderListApi.addNewOrderList(orderList);
        return res.data.data;
    }),
    getAllOrderList: createAsyncThunk('orderList/getAllOrderList', async () => {
        const res = await orderListApi.getAllOrderList();
        return res.data.data;
    }),
};
