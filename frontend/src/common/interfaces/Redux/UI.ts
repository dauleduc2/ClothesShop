import { ProductInCartDTO } from '../DTO/cartDTO';

export enum notificationStatus {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}
export interface UIState {
    isLoading: boolean;
    notification: {
        isOpenning: boolean;
        status: notificationStatus;
        title: string;
        message: string;
    };
    confirmPopUp: {
        isConfirm: boolean | null;
        isOpenning: boolean;
        title: string;
        message: string;
        productToDelete: ProductInCartDTO;
    };
    successModel: {
        isOpenning: boolean;
        title: string;
        message: string;
    };
}

export interface SetNotificationPayload {
    status: notificationStatus;
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
