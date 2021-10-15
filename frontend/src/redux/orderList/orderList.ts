import { createSlice } from '@reduxjs/toolkit';
import { OrderListState } from '../../common/interfaces/orderList';
import { orderListThunk } from './orderListThunk';

const initialState: OrderListState = {
    orderList: [],
};

export const orderList = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        resetState: () => {
            return {
                ...initialState,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(orderListThunk.addOrderList.fulfilled, (state: OrderListState, { payload }) => {
            return {
                ...state,
            };
        });
        builder.addCase(orderListThunk.getAllOrderList.fulfilled, (state: OrderListState, { payload }) => {
            return {
                ...state,
                orderList: payload,
            };
        });
    },
});
export const cartListAction = { ...orderList.actions };
export default orderList.reducer;
