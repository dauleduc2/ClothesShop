import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderListApi } from '../../api/orderListApi';
import { ServerResponse } from '../../common/interfaces/Common/api';
import { OrderListToSendDTO, UpdateStatusResponseDTO } from '../../common/interfaces/DTO/orderListDTO';
export const orderListThunk = {
    addOrderList: createAsyncThunk('orderList/addOrderList', async (orderList: OrderListToSendDTO) => {
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
    adminUpdateStatusOfOrderList: createAsyncThunk<
        UpdateStatusResponseDTO,
        UpdateStatusResponseDTO,
        {
            rejectValue: ServerResponse<any, any>;
        }
    >('orderList/adminUpdateStatusOfOrderList', async ({ ID, status }, { rejectWithValue }) => {
        try {
            await orderListApi.adminUpdateStatusOfOrderList(ID, status);
            return { ID, status };
        } catch (error: any) {
            const rejectValue = error.response.data as ServerResponse<any, any>;
            return rejectWithValue(rejectValue);
        }
    }),
};
