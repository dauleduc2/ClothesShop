import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../api/productApi';
import { AdminQuery } from '../../common/interfaces/Common/query';
import { ProductAddFormDTO } from '../../common/interfaces/DTO/productDTO';
export const productThunk = {
    getAllProduct: createAsyncThunk('product/getAllProduct', async ({ limit, page }: AdminQuery) => {
        const res = await productApi.getAllProduct({ limit, page });
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
    adminAddNewProduct: createAsyncThunk('product/adminAddNewProduct', async (product: ProductAddFormDTO) => {
        const res = await productApi.addNewProduct(product);
        return res.data.data;
    }),
};
