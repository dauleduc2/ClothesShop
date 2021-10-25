import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../api/productApi';
import { AdminQuery } from '../../common/interfaces/Common/query';
export const productThunk = {
    getAllProduct: createAsyncThunk('product/getAllProduct', async () => {
        const res = await productApi.getAllProduct();
        return res.data.data;
    }),
    getSpecificProduct: createAsyncThunk('product/getSpecificProduct', async (productName: string) => {
        const res = await productApi.getSpecificProduct(productName);
        return res.data.data[0];
    }),
    adminGetAllProduct: createAsyncThunk('product/adminGetAllProduct', async ({ limit, page }: AdminQuery) => {
        const res = await productApi.adminGetAllProduct({ limit, page });
        return res.data.data;
    }),
};
