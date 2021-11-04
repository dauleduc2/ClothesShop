//view
export const HOME = '/';
export const CATEGORY = '/category';
export const CART = '/user/cart';
//form
export const LOGIN = '/user/login';
export const REGISTER = '/user/register';
export const ME = '/user/me';
//product
export const PRODUCT = '/product';

//order
export const ORDER = '/user/order';
//admin

export const ADMIN = '/admin';
export const ADMIN_ORDER = `${ADMIN}/order`;
export const ADMIN_USER = `${ADMIN}/user`;
export const ADMIN_PRODUCT = `${ADMIN}/product`;
export const ADMIN_UPDATE_PRODUCT = `${ADMIN_PRODUCT}/:productName`;
export const ADMIN_FORM = `${ADMIN}/form`;

//analyst
export const ADMIN_PRODUCT_ANALYST = '/admin/analyst/product';

export const ADMIN_ADD_PRODUCT_FORM = '/admin/form/product';
export const ADMIN_ADD_COLOR_FORM = '/admin/form/color/add';
export const ADMIN_REMOVE_COLOR_FORM = '/admin/form/color/remove';
export const ADMIN_ADD_SIZE_FORM = '/admin/form/size/add';
export const ADMIN_REMOVE_SIZE_FORM = '/admin/form/size/remove';
export const ADMIN_ADD_TYPE_FORM = '/admin/form/type/add';
export const ADMIN_REMOVE_TYPE_FORM = '/admin/form/type/remove';

//not found
export const NOT_FOUND = '*';

//action
export const LOGOUT = '/user/logout';
//ENV
export const ENV_SERVER = process.env.REACT_APP_SERVER_URL;
