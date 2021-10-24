import CategoryPage from '../components/Category';
import HomePage from '../components/HomePage';
import MePage from '../containers/Me';
import ProductPage from '../containers/ProductDetails';
import LoginPage from '../containers/Login';
import Register from '../containers/Register';
import Cart from '../containers/Cart';
import OrderPage from '../containers/Order';
import CurrentOrder from '../containers/CurrentOrder';
import NotFoundPage from '../components/NotFoundPage';
import { ArchiveIcon, PencilAltIcon } from '@heroicons/react/outline';
import UserGroup from '../components/common/icon/UserGroup';
import OrderManagerPage from '../containers/OrderManager';
import UserManagerPage from '../containers/UserManager';
import ProductManagerPage from '../containers/ProductManager';
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
        to: '/',
        exact: true,
        buttonName: 'Home',
    },
    {
        to: '/category',
        exact: true,
        buttonName: 'Category',
    },
];

export const userLink: routeList = [
    {
        to: '/user/me',
        exact: true,
        buttonName: 'Your Profile',
    },
    {
        to: '/user/order',
        exact: true,
        buttonName: 'My order',
    },
    {
        to: '/user/logout',
        exact: true,
        buttonName: 'Sign out',
    },
];

export const adminUserLink: routeList = [
    {
        to: '/admin/order?limit=10&page=1',
        exact: true,
        buttonName: 'Manager ',
    },
];

export const userMobileLink: routeList = [
    {
        to: '/user/me',
        exact: true,
        buttonName: 'Your Profile',
    },
    {
        to: '/user/cart',
        exact: true,
        buttonName: 'Your Cart',
    },
    {
        to: '/user/order',
        exact: true,
        buttonName: 'My order',
    },
    {
        to: '/user/logout',
        exact: true,
        buttonName: 'Sign out',
    },
];

export const routes: routeList = [
    {
        to: '/user/register',
        exact: true,
        component: Register,
    },
    {
        to: '/product/:productName',
        exact: true,
        component: ProductPage,
    },
    {
        to: '/',
        exact: true,
        component: HomePage,
    },
    {
        to: '/category',
        exact: true,
        component: CategoryPage,
    },
    {
        to: '/user/me',
        exact: true,
        component: MePage,
        isLoginRequire: true,
    },
    {
        to: '/user/login',
        exact: true,
        component: LoginPage,
    },
    {
        to: '/user/cart',
        exact: true,
        component: Cart,
    },
    {
        to: '/user/order',
        exact: true,
        component: OrderPage,
        isLoginRequire: true,
    },
    {
        to: '/user/order/:orderID',
        exact: true,
        component: CurrentOrder,
        isLoginRequire: true,
    },
    {
        to: '/admin/order',
        exact: true,
        component: OrderManagerPage,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: '/admin/user',
        exact: true,
        component: UserManagerPage,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: '/admin/product',
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
        to: '/admin/order?limit=10&page=1',
        exact: true,
        icon: ArchiveIcon,
    },
    {
        to: '/admin/user?limit=10&page=1',
        exact: true,
        icon: UserGroup,
    },
    {
        to: '/admin/product?limit=10&page=1',
        exact: true,
        icon: PencilAltIcon,
    },
];
