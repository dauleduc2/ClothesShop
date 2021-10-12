import { productThunk } from './productThunk';
import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../common/interfaces/product';
import { ReduxAction } from '../../common/interfaces/redux';
import { defaultProduct } from '../common/defaultValue';

const initialState: ProductState = {
    productToShowList: [],
    currentProduct: defaultProduct,
};
export const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state: ProductState, action: ReduxAction<Product>) => {
            return {
                ...state,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(productThunk.getAllProduct.fulfilled, (state, { payload }) => {
            return { ...state, productToShowList: payload };
        });
        builder.addCase(productThunk.getSpecificProduct.fulfilled, (state, { payload }) => {
            return {
                ...state,
                currentProduct: payload,
            };
        });
    },
});

export const productAction = { ...product.actions };
export default product.reducer;
