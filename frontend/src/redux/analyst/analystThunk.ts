import { createAsyncThunk } from '@reduxjs/toolkit';
import { analystApi } from '../../api/analystApi';
import { AnalystDate, GetEachProductProps } from '../../common/interfaces/Common/analyst';
export const analystThunk = {
    getTotalSaleOnTime: createAsyncThunk('analyst/getTotalSaleOnTime', async (dateRange: AnalystDate) => {
        const res = await analystApi.adminGetTotalSaleOnTime(dateRange);
        return res.data.data;
    }),
    getTotalPriceOnTime: createAsyncThunk('analyst/getTotalPriceOnTime', async (dateRange: AnalystDate) => {
        const res = await analystApi.adminGetTotalPriceOnTime(dateRange);
        return res.data.data;
    }),
    adminGetTotalItemByType: createAsyncThunk('analyst/adminGetTotalItemByType', async (dateRange: AnalystDate) => {
        const res = await analystApi.adminGetTotalItemByType(dateRange);
        return res.data.data;
    }),
    adminGetTotalPriceByType: createAsyncThunk('analyst/adminGetTotalPriceByType', async (dateRange: AnalystDate) => {
        const res = await analystApi.adminGetTotalPriceByType(dateRange);
        return res.data.data;
    }),
    adminGetEachProductAnalyst: createAsyncThunk(
        'analyst/adminGetEachProductAnalyst',
        async (data: GetEachProductProps) => {
            const res = await analystApi.adminGetEachProductAnalyst(data);
            return res.data.data;
        }
    ),
};
