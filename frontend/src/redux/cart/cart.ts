import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../common/interfaces/DTO/cartDTO';
import { ReduxAction } from '../../common/interfaces/Common/redux';
import { CartState } from '../../common/interfaces/Redux/cart';

const dataFromLocalStorage = localStorage.getItem('cartList');

const initialState: CartState = {
    productList: dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : [],
};

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetState: (state: CartState) => {
            localStorage.setItem('cartList', JSON.stringify([]));
            return {
                productList: [],
            };
        },
        addProduct: (state: CartState, { payload }: ReduxAction<ProductInCart>) => {
            const newState = { ...state };
            let decoyArray = [...state.productList];
            //data to compare
            const { quantity, ...payloadData } = payload;
            //find position of product in list
            let positionOfProduct = -1;
            decoyArray.forEach((product, index) => {
                const { quantity, ...productData } = product;
                if (JSON.stringify(productData) === JSON.stringify(payloadData)) {
                    positionOfProduct = index;
                }
            });
            if (positionOfProduct === -1) {
                decoyArray = [...decoyArray, payload];
            }
            if (positionOfProduct !== -1) {
                decoyArray[positionOfProduct] = {
                    ...payload,
                    quantity: decoyArray[positionOfProduct].quantity + payload.quantity,
                };
            }

            newState.productList = decoyArray;
            //set cart list to localstorage
            localStorage.setItem('cartList', JSON.stringify(newState.productList));
            return newState;
        },
        updateProduct: (state: CartState, { payload }: ReduxAction<ProductInCart>) => {
            const newState = { ...state };
            let decoyArray = [...state.productList];
            //data to compare
            const { quantity, ...payloadData } = payload;
            //find position of product in list
            let positionOfProduct = -1;
            decoyArray.forEach((product, index) => {
                const { quantity, ...productData } = product;
                if (JSON.stringify(productData) === JSON.stringify(payloadData)) {
                    positionOfProduct = index;
                }
            });
            //this case is possible because already check in UI, but still check for safe
            //if quanitity !== 0 then return array with new value of product
            if (payload.quantity !== 0) {
                decoyArray[positionOfProduct] = payload;
            }
            // if quanitty === 0 then remove the product from list
            if (payload.quantity === 0) {
                decoyArray.splice(positionOfProduct, 1);
            }

            newState.productList = decoyArray;
            //set cart list to localstorage
            localStorage.setItem('cartList', JSON.stringify(newState.productList));
            return newState;
        },
        deleteProduct: (state: CartState, { payload }: ReduxAction<ProductInCart>) => {
            const newState = { ...state };
            let decoyArray = [...state.productList];

            decoyArray.forEach((product, index) => {
                if (JSON.stringify(product) === JSON.stringify(payload)) {
                    decoyArray.splice(index, 1);
                }
            });

            newState.productList = decoyArray;
            //set cart list to localstorage
            localStorage.setItem('cartList', JSON.stringify(newState.productList));
            return newState;
        },
    },
});
export const cartListAction = { ...cart.actions };
export default cart.reducer;
