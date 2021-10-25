import { createSlice } from '@reduxjs/toolkit';
import { OrderListState } from '../../common/interfaces/Redux/orderList';
import { defaultOrderList } from '../common/defaultValue';
import { orderListThunk } from './orderListThunk';

const initialState: OrderListState = {
    orderList: [],
    currentList: defaultOrderList,
    admin: {
        currentToShow: [],
        count: 0,
    },
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
        builder.addCase(orderListThunk.getOrderListById.fulfilled, (state: OrderListState, { payload }) => {
            return {
                ...state,
                currentList: payload,
            };
        });
        builder.addCase(orderListThunk.adminGetAllOrderList.fulfilled, (state: OrderListState, { payload }) => {
            return {
                ...state,
                admin: {
                    currentToShow: payload.data,
                    count: payload.count,
                },
            };
        });
        builder.addCase(orderListThunk.adminUpdateStatusOfOrderList.fulfilled, (state: OrderListState, { payload }) => {
            const decoyCurrentToShow = [...state.admin.currentToShow];
            decoyCurrentToShow.forEach((OrderList, index) => {
                if (OrderList.ID === payload.ID) {
                    decoyCurrentToShow[index] = {
                        ...decoyCurrentToShow[index],
                        status: payload.status,
                    };
                }
            });
            return {
                ...state,
                admin: {
                    ...state.admin,
                    currentToShow: decoyCurrentToShow,
                },
            };
        });
    },
});
export const cartListAction = { ...orderList.actions };
export default orderList.reducer;
