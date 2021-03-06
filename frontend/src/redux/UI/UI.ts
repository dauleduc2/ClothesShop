import { createSlice } from '@reduxjs/toolkit';
import { ProductInCartDTO } from '../../common/interfaces/DTO/cartDTO';
import { ReduxAction } from '../../common/interfaces/Common/redux';
import {
    SetConfirmPopupPayload,
    SetNotificationPayload,
    SetSuccessModel,
    UIState,
} from '../../common/interfaces/Redux/UI';
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
    successModel: {
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
        setProductToDelete: (state: UIState, { payload }: ReduxAction<ProductInCartDTO>) => {
            return {
                ...state,
                confirmPopUp: {
                    ...state.confirmPopUp,
                    productToDelete: payload,
                },
            };
        },
        resetSuccessModel: (state: UIState) => {
            return {
                ...state,
                successModel: {
                    ...initialState.successModel,
                },
            };
        },
        setSuccessModel: (state: UIState, { payload }: ReduxAction<SetSuccessModel>) => {
            return {
                ...state,
                successModel: {
                    isOpenning: true,
                    ...payload,
                },
            };
        },
    },
});
export const UIListAction = { ...UI.actions };
export default UI.reducer;
