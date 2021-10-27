import { createAsyncThunk } from '@reduxjs/toolkit';
import { colorApi } from '../../api/colorApi';
export const colorThunk = {
    adminGetAllColor: createAsyncThunk('color/adminGetAllColor', async () => {
        const res = await colorApi.adminGetAllColor();
        return res.data.data;
    }),
};
