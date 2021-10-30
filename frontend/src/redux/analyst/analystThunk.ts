import { createAsyncThunk } from '@reduxjs/toolkit';
import { analystApi } from '../../api/analystApi';
import { AnalystDate } from '../../common/interfaces/Common/analyst';
export const analystThunk = {
    getTotalSaleOnTime: createAsyncThunk('analyst/getTotalSaleOnTime', async (dateRange: AnalystDate) => {
        const res = await analystApi.adminGetTotalSaleOnTime(dateRange);
        return res.data.data;
    }),
    getTotalPriceOnTime: createAsyncThunk('analyst/getTotalPriceOnTime', async (dateRange: AnalystDate) => {
        const res = await analystApi.adminGetTotalPriceOnTime(dateRange);
        return res.data.data;
    }),
};
