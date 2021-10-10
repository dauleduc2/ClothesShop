export interface UIState {
    isLoading: boolean;
    notification: {
        isOpenning: boolean;
        status: string;
        title: string;
        message: string;
    };
}
export interface UIAction {
    type: string;
}

export interface setNotificationAction extends UIAction {
    payload: {
        status: string;
        title: string;
        message: string;
    };
}
