import CategoryPage from '../components/Category';
import HomePage from '../components/HomePage';
import MePage from '../containers/Me';
import ProductPage from '../containers/ProductDetails';
import LoginPage from '../containers/Login';
import Register from '../containers/Register';
import Cart from '../containers/Cart';
import OrderPage from '../containers/Order';
import CurrentOrder from '../containers/CurrentOrder';
interface Route {
    to: string;
    exact: boolean;
    buttonName?: string;
    component?: any;
    icon?: any;
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
    },
    {
        to: '/user/order/:orderID',
        exact: true,
        component: CurrentOrder,
    },
];
