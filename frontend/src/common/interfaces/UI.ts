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
}
export interface UIAction<T> {
    type: string;
    payload: T;
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
