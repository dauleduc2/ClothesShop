import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { useEffect } from 'react';
import { userThunk } from '../../../redux/user/userThunk';
import { UserState } from '../../interfaces/user';
import { store } from '../../../redux';
import { userListAction } from '../../../redux/user/user';
interface AutoLoginWrapperProps {}

const AutoLoginWrapper: React.FunctionComponent<AutoLoginWrapperProps> = ({ children }) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    useEffect(() => {
        if (userState.isLogin) {
            store.dispatch(userThunk.getCurrentUser());
        } else {
            store.dispatch(userListAction.setLogin(false));
        }
    }, [userState.isLogin]);
    return <div>{children}</div>;
};

export default AutoLoginWrapper;
