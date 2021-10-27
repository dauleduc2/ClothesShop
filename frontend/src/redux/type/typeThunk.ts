import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeApi } from '../../api/typeApi';
export const typeThunk = {
    adminGetAllType: createAsyncThunk('type/adminGetAllType', async () => {
        const res = await typeApi.adminGetAllType();
        return res.data.data;
    }),
};
