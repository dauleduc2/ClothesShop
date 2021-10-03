import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ProductState } from "../../type";

const initialState: ProductState = {
    productList: [],
};
export const product = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state: ProductState, action: PayloadAction<IProduct>) => {
            return {
                ...state,
            };
        },
    },
});

export const productAction = { ...product.actions };
export default product.reducer;
