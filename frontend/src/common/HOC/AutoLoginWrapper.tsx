import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userThunk } from '../../redux/user/userThunk';
import { RootState, store } from '../../redux';
import { UserState } from '../interfaces/Redux/user';
interface AutoLoginWrapperProps {}

const AutoLoginWrapper: React.FunctionComponent<AutoLoginWrapperProps> = ({ children }) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    useEffect(() => {
        store.dispatch(userThunk.getCurrentUser());
    }, [userState.isLogin]);
    return <>{children}</>;
};

export default AutoLoginWrapper;
