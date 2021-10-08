import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux';
import * as routes from '../../consts/routes';
import { UserState } from '../../common/interfaces/user';
import LogoutIcon from '@mui/icons-material/Logout';
import { store } from '../../redux';
import { userThunk } from '../../redux/user/userThunk';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
interface NavigationProps {
    isOpenning: boolean;
    onCloseSideBar: Function;
    isMobile: boolean;
}

const Navigation: React.FunctionComponent<NavigationProps> = (props) => {
    const { isOpenning, isMobile, onCloseSideBar } = props;
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const history = useHistory();
    const onHandleSelectionClick = () => {
        if (isMobile) {
            onCloseSideBar();
        }
    };
    const onHandleLogout = () => {
        store.dispatch(userThunk.logout());
        onHandleSelectionClick();
        toast.success('logout success');
        history.push('/');
    };
    const renderSelection = () => {
        let result;
        const routeToRender = [...routes.navigationLink];
        if (userState.isLogin) {
            routeToRender.push({
                to: '/user/me/logout',
                exact: true,
                buttonName: 'Logout',
                icon: LogoutIcon,
            });
        }
        result = routeToRender.map((route) => {
            const { icon: IconComponent } = route;
            if (userState.isLogin && route.to === '/user/login') {
                return false;
            }
            if (!userState.isLogin && route.to === '/user/me') {
                return false;
            }
            if (route.to === '/user/me/logout') {
                return (
                    <li className="mb-4 text-gray-700 rounded-lg" key={route.buttonName} onClick={onHandleLogout}>
                        <div className="flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-lg ">
                            <IconComponent />
                            {route.buttonName}
                        </div>
                    </li>
                );
            }
            return (
                <li className="mb-4 text-gray-700 rounded-lg " key={route.buttonName} onClick={onHandleSelectionClick}>
                    <NavLink
                        to={route.to}
                        exact={route.exact}
                        className="flex items-center gap-4 px-4 py-3 text-sm font-semibold rounded-lg "
                        activeClassName="bg-gradient-to-tr from-lightBlue-500 to-lightBlue-600 text-white shadow-md"
                    >
                        <IconComponent />
                        {route.buttonName}
                    </NavLink>
                </li>
            );
        });
        return result;
    };
    return (
        <div
            className={`h-screen ${
                isOpenning ? '-ml-0' : '-ml-64'
            } top-0 md:left-0 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 fixed lg:static z-10 py-4 px-6 transition-all duration-300`}
        >
            <div className="relative flex-col items-stretch min-h-full px-0 flex-nowrap">
                <a href="https://www.facebook.com/" className="inline-block w-full mt-2 text-center">
                    <div className="text-2xl font-bold">Clothes Shop</div>
                </a>
                <div className="flex flex-col">
                    <hr className="min-w-full my-4" />
                    <ul className="flex flex-col min-w-full list-none">{renderSelection()}</ul>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
