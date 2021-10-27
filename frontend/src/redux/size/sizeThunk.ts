import { createAsyncThunk } from '@reduxjs/toolkit';
import { sizeApi } from '../../api/sizeApi';
export const sizeThunk = {
    adminGetAllSize: createAsyncThunk('size/adminGetAllSize', async () => {
        const res = await sizeApi.adminGetAllSize();
        return res.data.data;
    }),
};
