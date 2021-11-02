import React from 'react';
import * as urlLink from './url';
const CategoryPage = React.lazy(() => import('../components/Category'));
const HomePage = React.lazy(() => import('../containers/HomePage'));
const MePage = React.lazy(() => import('../containers/Me'));
const ProductPage = React.lazy(() => import('../containers/ProductDetails'));
const LoginPage = React.lazy(() => import('../containers/Login'));
const Register = React.lazy(() => import('../containers/Register'));
const Cart = React.lazy(() => import('../containers/Cart'));
const OrderPage = React.lazy(() => import('../containers/Order'));
const CurrentOrder = React.lazy(() => import('../containers/CurrentOrder'));
const NotFoundPage = React.lazy(() => import('../components/NotFoundPage'));
const OrderManagerPage = React.lazy(() => import('../containers/Admin/OrderManager'));
const UserManagerPage = React.lazy(() => import('../containers/Admin/UserManager'));
const ProductManagerPage = React.lazy(() => import('../containers/Admin/ProductManager'));
const FormManager = React.lazy(() => import('../containers/Admin/FormManager'));
const AddProductForm = React.lazy(() => import('../containers/Admin/FormManager/AddProductForm'));
const AddSizeForm = React.lazy(() => import('../containers/Admin/FormManager/AddSizeForm'));
const AddTypeForm = React.lazy(() => import('../containers/Admin/FormManager/AddTypeForm'));
const AddColorForm = React.lazy(() => import('../containers/Admin/FormManager/AddColorForm'));
const RemoveColorForm = React.lazy(() => import('../containers/Admin/FormManager/RemoveColorForm'));
const RemoveTypeForm = React.lazy(() => import('../containers/Admin/FormManager/RemoveTypeForm'));
const RemoveSizeForm = React.lazy(() => import('../containers/Admin/FormManager/RemoveSizeForm'));
const ProductAnalyst = React.lazy(() => import('../containers/Admin/AnalystManager/productAnalyst'));
const UpdateProductForm = React.lazy(() => import('../containers/Admin/UpdateProduct'));
export interface Route {
    to: string;
    exact: boolean;
    buttonName?: string;
    component?: any;
    icon?: any;
    isLoginRequire?: boolean;
    isAdminRequire?: boolean;
}

export const routes: Route[] = [
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
        to: urlLink.ADMIN_UPDATE_PRODUCT,
        exact: true,
        component: UpdateProductForm,
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
        to: urlLink.ADMIN_PRODUCT_ANALYST,
        exact: true,
        component: ProductAnalyst,
        isLoginRequire: true,
        isAdminRequire: true,
    },
    {
        to: '*',
        exact: true,
        component: NotFoundPage,
    },
];

export const AdminFormRoute: Route[] = [
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
