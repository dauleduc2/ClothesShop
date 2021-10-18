import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product/product';
import UIReducer from './UI/UI';
import UserReducer from './user/user';
import CartReducer from './cart/cart';
import OrderListReducer from './orderList/orderList';
import formReducer from './form/form';

export const store = configureStore({
    reducer: {
        product: productReducer,
        UI: UIReducer,
        user: UserReducer,
        cart: CartReducer,
        orderList: OrderListReducer,
        form: formReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
