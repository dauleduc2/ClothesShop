import { createSlice } from '@reduxjs/toolkit';
import { setNotificationAction, UIState } from '../../common/interfaces/UI';

const initialState: UIState = {
    isLoading: false,
    notification: {
        isOpenning: false,
        status: '',
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
        setNotification: (state: UIState, action: setNotificationAction) => {
            return {
                ...state,
                notification: {
                    isOpenning: true,
                    ...action.payload,
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
    },
});
export const UIListAction = { ...UI.actions };
export default UI.reducer;
