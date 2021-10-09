import { productThunk } from './productThunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../common/interfaces/product';

const initialState: ProductState = {
    productToShowList: [],
    currentProduct: {
        ID: '',
        name: '',
        quantity: -1,
        price: -1,
        description: '',
        status: -1,
        images: [],
        types: [],
        colors: [],
        sizes: [],
        createDate: '',
        productAvatar: '',
    },
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
