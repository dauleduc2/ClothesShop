import CategoryPage from '../components/Category';
import HomePage from '../components/HomePage';
import MePage from '../containers/Me';
import ProductPage from '../containers/ProductDetails';
import LoginPage from '../containers/Login';
import Register from '../containers/Register';
interface Route {
    to: string;
    exact: boolean;
    buttonName: string;
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
        to: '/user/logout',
        exact: true,
        buttonName: 'Sign out',
    },
];

export const routes: routeList = [
    {
        to: '/user/register',
        exact: true,
        buttonName: 'Register',
        component: Register,
    },
    {
        to: '/product/:productName',
        exact: true,
        buttonName: 'Product detail',
        component: ProductPage,
    },
    {
        to: '/',
        exact: true,
        buttonName: 'Home page',
        component: HomePage,
    },
    {
        to: '/category',
        exact: true,
        buttonName: 'Category',
        component: CategoryPage,
    },
    {
        to: '/user/me',
        exact: true,
        buttonName: 'Me',
        component: MePage,
    },
    {
        to: '/user/login',
        exact: true,
        buttonName: 'Login',
        component: LoginPage,
    },
];
