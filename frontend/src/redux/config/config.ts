import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/product";
import UIReducer from "../reducers/UI";
export const store = configureStore({
    reducer: {
        product: productReducer,
        UI: UIReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
