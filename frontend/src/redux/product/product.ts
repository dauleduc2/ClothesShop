import { productThunk } from './productThunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../common/interfaces/product';

const initialState: ProductState = {
    productList: [],
};
export const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state: ProductState, action: PayloadAction<Product>) => {
            return {
                ...state,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(productThunk.getAllProduct.fulfilled, (state, { payload }) => {
            return { ...state, productList: payload };
        });
    },
});

export const productAction = { ...product.actions };
export default product.reducer;
