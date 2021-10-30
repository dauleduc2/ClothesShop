import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/product';
import UIReducer from './UI/UI';
import UserReducer from './user/user';
import CartReducer from './cart/cart';
import OrderListReducer from './orderList/orderList';
import formReducer from './form/form';
import sizeReducer from './size/size';
import colorReducer from './color/color';
import typeReducer from './type/type';
import analystReducer from './analyst/analyst';
export const store = configureStore({
    reducer: {
        product: productReducer,
        UI: UIReducer,
        user: UserReducer,
        cart: CartReducer,
        orderList: OrderListReducer,
        form: formReducer,
        size: sizeReducer,
        color: colorReducer,
        type: typeReducer,
        analyst: analystReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
