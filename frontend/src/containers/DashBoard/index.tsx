import ContentRoute from '../ContentRoute';
import Navigation from '../../components/Navbar';
import ShopBar from '../ShopBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useMediaQuery } from '@mui/material';
import { UIListAction } from '../../redux/UI/UI';
import { useEffect } from 'react';
import AutoLoginWrapper from '../../common/Auth/AutoLoginWrapper';
import { UIState } from '../../common/interfaces/UI';
import { store } from '../../redux';
import Navbar from '../Navbar';
import { routes } from '../../consts/routes';
import { UserState } from '../../common/interfaces/user';
import { userThunk } from '../../redux/user/userThunk';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
type Props = {};
export const DashBoard = (props: Props) => {
    const isMobile = useMediaQuery('(max-width:640px)');
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const history = useHistory();
    //userEffect for mobile side bar
    useEffect(() => {
        if (isMobile) {
            store.dispatch(UIListAction.setSideBarOpenning(false));
        }
    }, [isMobile]);
    const renderContent = () => {
        let result;
        result = routes.map((route) => <ContentRoute route={route} key={route.buttonName} />);
        return result;
    };
    const UIState = useSelector<RootState, UIState>((state) => state.UI);
    const onCloseSideBar = () => {
        store.dispatch(UIListAction.setSideBarOpenning(false));
    };
    return (
        <div className="flex w-full ">
            <div className="flex flex-col w-full h-screen text-4xl text-center">
                <Navbar />
                <AutoLoginWrapper>{renderContent()}</AutoLoginWrapper>
            </div>
            <div
                className={`fixed w-screen h-screen gray-layer bg-gray-700 opacity-80 ${
                    UIState.isSideBarOpenning && isMobile ? 'visible' : 'hidden'
                } `}
                onClick={onCloseSideBar}
            ></div>
        </div>
    );
};
