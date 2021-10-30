import { createSlice } from '@reduxjs/toolkit';
import { AnalystState } from '../../common/interfaces/Redux/analyst';
import { analystThunk } from './analystThunk';

const initialState: AnalystState = {
    totalSale: [],
    totalPrice: [],
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
    },
});

export const productAction = { ...analyst.actions };
export default analyst.reducer;
