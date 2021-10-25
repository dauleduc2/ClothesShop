import { productThunk } from './productThunk';
import { createSlice } from '@reduxjs/toolkit';
import { ReduxAction } from '../../common/interfaces/Common/redux';
import { defaultProduct } from '../common/defaultValue';
import { ProductState } from '../../common/interfaces/Redux/product';
import { Product } from '../../common/interfaces/Model/Product';

const initialState: ProductState = {
    productToShowList: [],
    currentProduct: defaultProduct,
    admin: {
        productList: [],
        count: -1,
    },
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
        builder.addCase(productThunk.adminGetAllProduct.fulfilled, (state, { payload }) => {
            return {
                ...state,
                admin: {
                    count: payload.count,
                    productList: payload.data,
                },
            };
        });
    },
});

export const productAction = { ...product.actions };
export default product.reducer;
