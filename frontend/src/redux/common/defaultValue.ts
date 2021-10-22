import { ProductInCart } from '../../common/interfaces/cart';
import { LoginUserDTO, RegisterUserDTO, UpdateUserDTO } from '../../common/interfaces/form';
import { OrderList, OrderListWithUserDetailDTO } from '../../common/interfaces/orderList';
import { Product } from '../../common/interfaces/product';
import { notificationStatus } from '../../common/interfaces/UI';
import { User, UserRole } from '../../common/interfaces/user';

export const defaultProductInCart: ProductInCart = {
    ID: '',
    color: {
        ID: -1,
        name: '',
        hexCode: '',
    },
    size: {
        name: '',
        ID: -1,
    },
    productAvatar: '',
    price: -1,
    quantity: -1,
    name: '',
};

export const defaultNotification = {
    isOpenning: false,
    status: notificationStatus.SUCCESS,
    message: '',
    title: '',
};

export const defaultProduct: Product = {
    ID: '',
    name: '',
    quantity: -1,
    price: -1,
    description: '',
    status: -1,
    images: [],
    types: [],
    colors: [],
    sizes: [],
    createDate: '',
    productAvatar: '',
};

export const defaultUser: User = {
    ID: '',
    username: '',
    fullName: '',
    avatar: '',
    email: '',
    userStatus: -1,
    role: UserRole.CUSTOMER,
    createDate: '',
    address: '',
    phoneNumber: '',
};

export const defaultOrderList: OrderList = {
    status: 'WAITING',
    orderItem: [],
    ID: '',
    createDate: '',
};
export const defaultColor = {
    ID: -1,
    hexCode: '',
    name: '',
};

export const defaultSize = { ID: -1, name: '' };

//form
export const defautLoginUser: LoginUserDTO = {
    username: '',
    password: '',
    general: '',
};

export const defaultRegisterUser: RegisterUserDTO = {
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    general: '',
};

export const defaultUpdateUser: UpdateUserDTO = {
    fullName: '',
    avatar: '',
    email: '',
    general: '',
    address: '',
    phoneNumber: '',
};

export const defaultOrderListWithUserDetail: OrderListWithUserDetailDTO = {
    ID: '',
    orderItem: [],
    createDate: '',
    status: 'WAITING',
    user: defaultUser,
};
