import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/product";
import UIReducer from "./UI/UI";
import UserReducer from "./user/user";
export const store = configureStore({
    reducer: {
        product: productReducer,
        UI: UIReducer,
        user: UserReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
