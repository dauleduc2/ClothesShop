import { createAsyncThunk } from '@reduxjs/toolkit';
import { colorApi } from '../../api/colorApi';
import { AddColorDTO } from '../../common/interfaces/DTO/colorDTO';
export const colorThunk = {
    adminGetAllColor: createAsyncThunk('color/adminGetAllColor', async () => {
        const res = await colorApi.adminGetAllColor();
        return res.data.data;
    }),
    adminAddNewColor: createAsyncThunk('color/adminAddNewColor', async (newColor: AddColorDTO) => {
        const res = await colorApi.adminAddNewColor(newColor);
        return res.data.data;
    }),
};
