import ContentRoute from '../ContentRoute';
import Navigation from '../../components/Navbar';
import * as routes from '../../consts/routes';
import ShopBar from '../ShopBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { useMediaQuery } from '@mui/material';
import { UIListAction } from '../../redux/UI/UI';
import { useEffect } from 'react';
import AutoLoginWrapper from '../../common/Auth/AutoLoginWrapper';
import { UIState } from '../../common/interfaces/UI';
import { store } from '../../redux';
type Props = {};
export const DashBoard = (props: Props) => {
    const isMobile = useMediaQuery('(max-width:640px)');

    //userEffect for mobile side bar
    useEffect(() => {
        if (isMobile) {
            store.dispatch(UIListAction.setSideBarOpenning(false));
        }
    }, [isMobile]);
    const renderContent = () => {
        let result;
        result = routes.finalRoute.map((route) => <ContentRoute route={route} key={route.buttonName} />);
        return result;
    };
    const UIState = useSelector<RootState, UIState>((state) => state.UI);
    const onCloseSideBar = () => {
        store.dispatch(UIListAction.setSideBarOpenning(false));
    };
    return (
        <div className="flex w-full bg-gradient-to-t from-blue-100 to-blue-300">
            <Navigation isOpenning={UIState.isSideBarOpenning} onCloseSideBar={onCloseSideBar} isMobile={isMobile} />
            <div className="flex flex-col w-full h-screen text-4xl text-center ">
                <ShopBar />
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
