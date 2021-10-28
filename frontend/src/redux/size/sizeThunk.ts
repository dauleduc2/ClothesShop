import { createAsyncThunk } from '@reduxjs/toolkit';
import { sizeApi } from '../../api/sizeApi';
import { AddSizeDTO } from '../../common/interfaces/DTO/sizeDTO';
export const sizeThunk = {
    adminGetAllSize: createAsyncThunk('size/adminGetAllSize', async () => {
        const res = await sizeApi.adminGetAllSize();
        return res.data.data;
    }),
    adminAddNewSize: createAsyncThunk('Size/adminAddNewSize', async (newSize: AddSizeDTO) => {
        const res = await sizeApi.adminAddNewSize(newSize);
        return res.data.data;
    }),
};
