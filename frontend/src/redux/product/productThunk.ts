import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../api/productApi';
export const productThunk = {
    getAllProduct: createAsyncThunk('user/getAllProduct', async () => {
        const res = await productApi.getAllProdct();
        return res.data.data;
    }),
};
