import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../common/interfaces/cart';
import { ReduxAction } from '../../common/interfaces/redux';
import { SetConfirmPopupPayload, SetNotificationPayload, UIState } from '../../common/interfaces/UI';
import { defaultNotification, defaultProductInCart } from '../common/defaultValue';

const initialState: UIState = {
    isLoading: false,
    notification: defaultNotification,
    confirmPopUp: {
        productToDelete: defaultProductInCart,
        isConfirm: null,
        isOpenning: false,
        message: '',
        title: '',
    },
};

export const UI = createSlice({
    name: 'UI',
    initialState,
    reducers: {
        resetState: () => {
            return { ...initialState };
        },
        setNotification: (state: UIState, { payload }: ReduxAction<SetNotificationPayload>) => {
            return {
                ...state,
                notification: {
                    isOpenning: true,
                    ...payload,
                },
            };
        },
        closeNotification: (state: UIState) => {
            return {
                ...state,
                notification: defaultNotification,
            };
        },
        setConfirmPopUp: (state: UIState, { payload }: ReduxAction<SetConfirmPopupPayload>) => {
            return {
                ...state,
                confirmPopUp: {
                    ...state.confirmPopUp,
                    isOpenning: true,
                    ...payload,
                },
            };
        },
        resetConfirmPopup: (state: UIState) => {
            return {
                ...state,
                confirmPopUp: {
                    ...initialState.confirmPopUp,
                },
            };
        },
        setResponseOfPopup: (state: UIState, { payload }: ReduxAction<boolean>) => {
            return {
                ...state,
                confirmPopUp: {
                    ...state.confirmPopUp,
                    isConfirm: payload,
                },
            };
        },
        setProductToDelete: (state: UIState, { payload }: ReduxAction<ProductInCart>) => {
            return {
                ...state,
                confirmPopUp: {
                    ...state.confirmPopUp,
                    productToDelete: payload,
                },
            };
        },
    },
});
export const UIListAction = { ...UI.actions };
export default UI.reducer;
