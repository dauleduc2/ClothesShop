import { ProductInCart } from './cart';

export interface UIState {
    isLoading: boolean;
    notification: {
        isOpenning: boolean;
        status: string;
        title: string;
        message: string;
    };
    confirmPopUp: {
        isConfirm: boolean | null;
        isOpenning: boolean;
        title: string;
        message: string;
        productToDelete: ProductInCart;
    };
    successModel: {
        isOpenning: boolean;
        title: string;
        message: string;
    };
}

export interface SetNotificationPayload {
    status: string;
    title: string;
    message: string;
}

export interface SetConfirmPopupPayload {
    title: string;
    message: string;
}

export interface SetSuccessModel {
    title: string;
    message: string;
}
