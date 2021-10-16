import { UIListAction } from './../redux/UI/UI';
import { store } from '../redux';
import { notificationStatus } from '../common/interfaces/UI';

export const success = (title: string, message: string = '') => {
    store.dispatch(UIListAction.setNotification({ status: notificationStatus.SUCCESS, title, message }));
    setTimeout(() => {
        store.dispatch(UIListAction.closeNotification());
    }, 3000);
};

export const warning = (title: string, message: string = '') => {
    store.dispatch(UIListAction.setNotification({ status: notificationStatus.WARNING, title, message }));
    setTimeout(() => {
        store.dispatch(UIListAction.closeNotification());
    }, 3000);
};

export const error = (title: string, message: string = '') => {
    store.dispatch(UIListAction.setNotification({ status: notificationStatus.ERROR, title, message }));
    setTimeout(() => {
        store.dispatch(UIListAction.closeNotification());
    }, 3000);
};
