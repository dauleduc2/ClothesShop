import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../api/productApi';
export const productThunk = {
    getAllProduct: createAsyncThunk('product/getAllProduct', async () => {
        const res = await productApi.getAllProdct();
        return res.data.data;
    }),
    getSpecificProduct: createAsyncThunk('product/getSpecificProduct', async (productName: string) => {
        const res = await productApi.getSpecificProduct(productName);

        return res.data.data[0];
    }),
};
