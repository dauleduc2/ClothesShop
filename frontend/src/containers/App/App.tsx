import { useSelector } from 'react-redux';
import { ProductInCart } from '../../common/interfaces/cart';
import { UIState } from '../../common/interfaces/UI';
import ConfirmPopup from '../../components/common/ConfirmPopUp';
import Notification from '../../components/common/Notification';
import { RootState, store } from '../../redux';
import { UIListAction } from '../../redux/UI/UI';
import { DashBoard } from '../DashBoard';

function App() {
    const UIState = useSelector<RootState, UIState>((state) => state.UI);
    const onCloseNotification = () => {
        store.dispatch(UIListAction.closeNotification());
    };
    const onClosePopup = (isConfirm: boolean) => {
        store.dispatch(UIListAction.setResponseOfPopup(isConfirm));
    };
    return (
        <div>
            <DashBoard />
            <Notification
                status={UIState.notification.status}
                isOpenning={UIState.notification.isOpenning}
                title={UIState.notification.title}
                message={UIState.notification.message}
                onCloseNotification={onCloseNotification}
            />
            <ConfirmPopup
                isOpenning={UIState.confirmPopUp.isOpenning}
                message={UIState.confirmPopUp.message}
                title={UIState.confirmPopUp.title}
                onClosePopup={onClosePopup}
            />
        </div>
    );
}

export default App;
