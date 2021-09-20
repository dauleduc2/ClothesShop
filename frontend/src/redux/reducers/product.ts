import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ProductState } from "../../type";

const initialState: ProductState = {
    productList: [
        {
            productID: 1,
            name: "t-shirt",
            amount: 2,
            description: "t shirt for men",
            price: 3,
            status: 0,
            createDate: new Date(),
            type: [],
            size: [],
            images: [],
            colors: [],
        },
    ],
};
export const product = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state: ProductState, action: PayloadAction<IProduct>) => {
            const productList = [...state.productList];
            const {
                productID,
                name,
                amount,
                description,
                price,
                status,
                createDate,
                type,
                size,
                images,
                colors,
            } = action.payload;
            const newProduct: IProduct = {
                productID,
                name,
                amount,
                description,
                price,
                status,
                createDate,
                type,
                size,
                images,
                colors,
            };
            productList.push(newProduct);
            return {
                ...state,
                productList,
            };
        },
    },
});

export const productAction = { ...product.actions };
export default product.reducer;
