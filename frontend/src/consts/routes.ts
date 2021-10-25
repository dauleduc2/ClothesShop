import CategoryPage from '../components/Category';
import HomePage from '../components/HomePage';
import MePage from '../containers/Me';
import ProductPage from '../containers/Admin/ProductDetails';
import LoginPage from '../containers/Login';
import Register from '../containers/Register';
import Cart from '../containers/Cart';
import OrderPage from '../containers/Order';
import CurrentOrder from '../containers/CurrentOrder';
import NotFoundPage from '../components/NotFoundPage';
import { ArchiveIcon, PencilAltIcon } from '@heroicons/react/outline';
import UserGroup from '../components/common/icon/UserGroup';
import OrderManagerPage from '../containers/Admin/OrderManager';
import UserManagerPage from '../containers/Admin/UserManager';
import ProductManagerPage from '../containers/Admin/ProductManager';
import * as urlLink from './url';
interface Route {
    to: string;
    exact: boolean;
    buttonName?: string;
    component?: any;
    icon?: any;
    isLoginRequire?: boolean;
    isAdminRequire?: boolean;
}
type routeList = Route[];

export const navigationLink: routeList = [
    {
        to: urlLink.HOME,
        exact: true,
        buttonName: 'Home',
    },
    {
        to: urlLink.CATEGORY,
        exact: true,
        buttonName: 'Category',
    },
];

export const userLink: routeList = [
    {
        to: urlLink.ME,
        exact: true,
        buttonName: 'Your Profile',
    },
    {
        to: urlLink.ORDER,
        exact: true,
        buttonName: 'My order',
    },
    {
        to: urlLink.LOGOUT,
        exact: true,
        buttonName: 'Sign out',
    },
];

export const adminUserLink: routeList = [
    {
        to: `${urlLink.ADMIN_ORDER}?limit=10&page=1`,
        exact: true,
        buttonName: 'Manager ',
    },
];

export const userMobileLink: routeList = [
    {
        to: urlLink.ME,
        exact: true,
        buttonName: 'Your Profile',
    },
    {
        to: urlLink.CART,
        exact: true,
        buttonName: 'Your Cart',
    },
    {
        to: urlLink.ORDER,
        exact: true,
        buttonName: 'My order',
    },
    {
        to: urlLink.LOGOUT,
        exact: true,
        buttonName: 'Sign out',
    },
];

export const routes: routeList = [
    {
        to: urlLink.REGISTER,
        exact: true,
        component: Register,
    },
    {
        to: `${urlLink.PRODUCT}/:productName`,
        exact: true,
        component: ProductPage,
    },
    {
        to: urlLink.HOME,
        exact: true,
        component: HomePage,
    },
    {
        to: urlLink.CATEGORY,
        exact: true,
        component: CategoryPage,
    },
    {
        to: urlLink.ME,
        exact: true,
        component: MePage,
        isLoginRequire: true,
    },
    {
        to: urlLink.LOGIN,
        exact: true,
        component: LoginPage,
    },
    {
        to: urlLink.CART,
        exact: true,
        component: Cart,
    },
    {
        to: urlLink.ORDER,
        exact: true,
        component: OrderPage,
        isLoginRequire: true,
    },
    {
        to: `${urlLink.ORDER}/:orderID`,
        exact: true,
        component: CurrentOrder,
        isLoginRequire: true,
    },
    {
        to: urlLink.ADMIN_ORDER,
        exact: true,
        component: OrderManagerPage,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_USER,
        exact: true,
        component: UserManagerPage,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_PRODUCT,
        exact: true,
        component: ProductManagerPage,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: '*',
        exact: true,
        component: NotFoundPage,
    },
];

export const adminRoute: routeList = [
    {
        to: `${urlLink.ADMIN_ORDER}?limit=10&page=1`,
        exact: true,
        icon: ArchiveIcon,
    },
    {
        to: `${urlLink.ADMIN_USER}?limit=10&page=1`,
        exact: true,
        icon: UserGroup,
    },
    {
        to: `${urlLink.ADMIN_PRODUCT}?limit=7&page=1`,
        exact: true,
        icon: PencilAltIcon,
    },
];
