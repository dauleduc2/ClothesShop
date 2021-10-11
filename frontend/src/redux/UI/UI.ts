import { createSlice } from '@reduxjs/toolkit';
import { ProductInCart } from '../../common/interfaces/cart';
import { SetConfirmPopupPayload, SetNotificationPayload, UIAction, UIState } from '../../common/interfaces/UI';

const initialState: UIState = {
    isLoading: false,
    notification: {
        isOpenning: false,
        status: '',
        message: '',
        title: '',
    },
    confirmPopUp: {
        productToDelete: {
            color: {
                ID: -1,
                name: '',
                hexCode: '',
            },
            size: {
                name: '',
                ID: -1,
            },
            productAvatar: '',
            price: -1,
            quantity: -1,
            name: '',
        },
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
        resetState: (state: UIState) => {
            return { ...state };
        },
        setNotification: (state: UIState, { payload }: UIAction<SetNotificationPayload>) => {
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
                notification: {
                    isOpenning: false,
                    status: '',
                    message: '',
                    title: '',
                },
            };
        },
        setConfirmPopUp: (state: UIState, { payload }: UIAction<SetConfirmPopupPayload>) => {
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
        setResponseOfPopup: (state: UIState, { payload }: UIAction<boolean>) => {
            return {
                ...state,
                confirmPopUp: {
                    ...state.confirmPopUp,
                    isConfirm: payload,
                },
            };
        },
        setProductToDelete: (state: UIState, { payload }: UIAction<ProductInCart>) => {
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
