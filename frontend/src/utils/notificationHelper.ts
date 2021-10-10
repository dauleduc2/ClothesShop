import { UIListAction } from './../redux/UI/UI';
import { store } from '../redux';

export class notificationHelper {
    success(title: string, message: string = '') {
        store.dispatch(UIListAction.setNotification({ status: 'success', title, message }));
        setInterval(() => {
            store.dispatch(UIListAction.closeNotification());
        }, 3000);
    }
    warning(title: string, message: string = '') {
        store.dispatch(UIListAction.setNotification({ status: 'warning', title, message }));
        setInterval(() => {
            store.dispatch(UIListAction.closeNotification());
        }, 3000);
    }
    error(title: string, message: string = '') {
        store.dispatch(UIListAction.setNotification({ status: 'error', title, message }));
        setInterval(() => {
            store.dispatch(UIListAction.closeNotification());
        }, 3000);
    }
}
