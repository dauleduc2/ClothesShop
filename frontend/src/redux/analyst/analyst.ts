import { createSlice } from '@reduxjs/toolkit';
import { AnalystState } from '../../common/interfaces/Redux/analyst';
import { analystThunk } from './analystThunk';

const initialState: AnalystState = {
    totalSale: [],
    totalPrice: [],
    totalItemByType: [],
    totalPriceByType: [],
    eachProductAnalyst: [],
};
export const analyst = createSlice({
    name: 'analyst',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(analystThunk.getTotalSaleOnTime.fulfilled, (state, { payload }) => {
            return {
                ...state,
                totalSale: payload,
            };
        });
        builder.addCase(analystThunk.getTotalPriceOnTime.fulfilled, (state, { payload }) => {
            return {
                ...state,
                totalPrice: payload,
            };
        });
        builder.addCase(analystThunk.adminGetTotalItemByType.fulfilled, (state, { payload }) => {
            return {
                ...state,
                totalItemByType: payload,
            };
        });
        builder.addCase(analystThunk.adminGetTotalPriceByType.fulfilled, (state, { payload }) => {
            return {
                ...state,
                totalPriceByType: payload,
            };
        });
        builder.addCase(analystThunk.adminGetEachProductAnalyst.fulfilled, (state, { payload }) => {
            return {
                ...state,
                eachProductAnalyst: payload,
            };
        });
    },
});

export const productAction = { ...analyst.actions };
export default analyst.reducer;
