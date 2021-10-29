import CategoryPage from '../components/Category';
import HomePage from '../containers/HomePage';
import MePage from '../containers/Me';
import ProductPage from '../containers/ProductDetails';
import LoginPage from '../containers/Login';
import Register from '../containers/Register';
import Cart from '../containers/Cart';
import OrderPage from '../containers/Order';
import CurrentOrder from '../containers/CurrentOrder';
import NotFoundPage from '../components/NotFoundPage';
import UserGroup from '../components/common/icon/UserGroup';
import OrderManagerPage from '../containers/Admin/OrderManager';
import UserManagerPage from '../containers/Admin/UserManager';
import ProductManagerPage from '../containers/Admin/ProductManager';
import * as urlLink from './url';
import OrderManager from '../components/common/icon/OrderManager';
import ProductIcon from '../components/common/icon/Product';
import EditIcon from '../components/common/icon/Edit';
import FormManager from '../containers/Admin/FormManager';
import ColorIcon from '../components/common/icon/Color';
import CategoryIcon from '../components/common/icon/Category';
import SizeIcon from '../components/common/icon/Size';
import AddProductForm from '../containers/Admin/FormManager/AddProductForm';
import AddSizeForm from '../containers/Admin/FormManager/AddSizeForm';
import AddTypeForm from '../containers/Admin/FormManager/AddTypeForm';
import AddColorForm from '../containers/Admin/FormManager/AddColorForm';
import RemoveColorForm from '../containers/Admin/FormManager/RemoveColorForm';
import RemoveTypeForm from '../containers/Admin/FormManager/RemoveTypeForm';
import RemoveSizeForm from '../containers/Admin/FormManager/RemoveSizeForm';

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
        to: urlLink.ADMIN_FORM,
        exact: false,
        component: FormManager,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: '*',
        exact: true,
        component: NotFoundPage,
    },
];

export const AdminFormRoute: routeList = [
    {
        to: urlLink.ADMIN_ADD_PRODUCT_FORM,
        exact: true,
        component: AddProductForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_ADD_SIZE_FORM,
        exact: true,
        component: AddSizeForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_ADD_TYPE_FORM,
        exact: true,
        component: AddTypeForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_ADD_COLOR_FORM,
        exact: true,
        component: AddColorForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_REMOVE_COLOR_FORM,
        exact: true,
        component: RemoveColorForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_REMOVE_TYPE_FORM,
        exact: true,
        component: RemoveTypeForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: urlLink.ADMIN_REMOVE_SIZE_FORM,
        exact: true,
        component: RemoveSizeForm,
        isLoginRequire: true,
        isAdminRequire: true,
    },
];

export const adminRoute: routeList = [
    {
        to: `${urlLink.ADMIN_ORDER}?limit=10&page=1`,
        exact: true,
        icon: OrderManager,
    },
    {
        to: `${urlLink.ADMIN_USER}?limit=10&page=1`,
        exact: true,
        icon: UserGroup,
    },
    {
        to: `${urlLink.ADMIN_PRODUCT}?limit=7&page=1`,
        exact: true,
        icon: ProductIcon,
    },
    {
        to: `${urlLink.ADMIN_FORM}`,
        exact: true,
        icon: EditIcon,
    },
];

interface feature {
    to: string;
    title: string;
    description: string;
    icon: any;
    isDanger: boolean;
}

export const featureList: feature[] = [
    {
        to: urlLink.ADMIN_ADD_PRODUCT_FORM,
        title: 'Add new product',
        description: 'Full fill the form to add new product into your store',
        icon: ProductIcon,
        isDanger: false,
    },
    {
        to: urlLink.ADMIN_ADD_SIZE_FORM,
        title: 'Add new Size',
        description: 'Full fill the form to add new Size into your store',
        icon: SizeIcon,
        isDanger: false,
    },
    {
        to: urlLink.ADMIN_REMOVE_SIZE_FORM,
        title: 'Remove Size',
        description: 'Full fill the form to remove a Size from your store',
        icon: SizeIcon,
        isDanger: true,
    },
    {
        to: urlLink.ADMIN_ADD_COLOR_FORM,
        title: 'Add new Color',
        description: 'Full fill the form to add new Color into your store',
        icon: ColorIcon,
        isDanger: false,
    },
    {
        to: urlLink.ADMIN_REMOVE_COLOR_FORM,
        title: 'Remove Color',
        description: 'Full fill the form to remove a Color from your store',
        icon: ColorIcon,
        isDanger: true,
    },
    {
        to: urlLink.ADMIN_ADD_TYPE_FORM,
        title: 'Add new Type',
        description: 'Full fill the form to add new Type into your store',
        icon: CategoryIcon,
        isDanger: false,
    },
    {
        to: urlLink.ADMIN_REMOVE_TYPE_FORM,
        title: 'Remove Type',
        description: 'Full fill the form to remove a Type from your store',
        icon: CategoryIcon,
        isDanger: true,
    },
];
