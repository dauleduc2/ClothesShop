import { UIListAction } from './../redux/UI/UI';
import { store } from '../redux';

export const success = (title: string, message: string = '') => {
    store.dispatch(UIListAction.setNotification({ status: 'success', title, message }));
    setTimeout(() => {
        store.dispatch(UIListAction.closeNotification());
    }, 3000);
};

export const warning = (title: string, message: string = '') => {
    store.dispatch(UIListAction.setNotification({ status: 'warning', title, message }));
    setTimeout(() => {
        store.dispatch(UIListAction.closeNotification());
    }, 3000);
};

export const error = (title: string, message: string = '') => {
    store.dispatch(UIListAction.setNotification({ status: 'error', title, message }));
    setTimeout(() => {
        store.dispatch(UIListAction.closeNotification());
    }, 3000);
};
