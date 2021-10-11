import CategoryPage from '../components/Category';
import HomePage from '../components/HomePage';
import MePage from '../containers/Me';
import ProductPage from '../containers/ProductDetails';
import LoginPage from '../containers/Login';
import Register from '../containers/Register';
import Cart from '../containers/Cart';
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
    // {
    //     to: '/user/me',
    //     exact: true,
    //     buttonName: 'Me',
    // },
];

export const userLink: routeList = [
    {
        to: '/user/me',
        exact: true,
        buttonName: 'Your Profile',
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
];
