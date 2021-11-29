import CategoryIcon from '../components/common/icon/Category';
import ColorIcon from '../components/common/icon/Color';
import EditIcon from '../components/common/icon/Edit';
import GraphIcon from '../components/common/icon/Graph';
import OrderManager from '../components/common/icon/OrderManager';
import ProductIcon from '../components/common/icon/Product';
import SizeIcon from '../components/common/icon/Size';
import UserGroup from '../components/common/icon/UserGroup';
import { Route } from './routes';
import * as urlLink from './url';
//nav bar button
export const navigationLink: Route[] = [
    {
        to: urlLink.HOME,
        exact: true,
        buttonName: 'Home',
    },
];
//user icon selection desktop
export const userLink: Route[] = [
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
export const adminUserLink: Route[] = [
    {
        to: `${urlLink.ADMIN_ORDER}?limit=10&page=1`,
        exact: true,
        buttonName: 'Manager ',
    },
];
//user icon selection on mobile
export const userMobileLink: Route[] = [
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
// icon selection on sidebar of admin page
export const adminRoute: Route[] = [
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
    {
        to: `${urlLink.ADMIN_PRODUCT_ANALYST}`,
        exact: true,
        icon: GraphIcon,
    },
];
//function of form manager
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
