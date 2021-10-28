import { createAsyncThunk } from '@reduxjs/toolkit';
import { typeApi } from '../../api/typeApi';
import { AddTypeDTO } from '../../common/interfaces/DTO/typeDTO';
export const typeThunk = {
    adminGetAllType: createAsyncThunk('type/adminGetAllType', async () => {
        const res = await typeApi.adminGetAllType();
        return res.data.data;
    }),
    adminAddNewType: createAsyncThunk('Type/adminAddNewType', async (newType: AddTypeDTO) => {
        const res = await typeApi.adminAddNewType(newType);
        return res.data.data;
    }),
};
