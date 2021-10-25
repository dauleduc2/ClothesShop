import { ProductInCart } from '../../common/interfaces/DTO/cartDTO';
import { ResponseWithCount } from '../../common/interfaces/Common/response';
import { Product } from '../../common/interfaces/Model/Product';
import { OrderListWithUserDetailDTO } from '../../common/interfaces/DTO/orderListDTO';

import { notificationStatus } from '../../common/interfaces/Redux/UI';
import { OrderList } from '../../common/interfaces/Model/OrderList';
import { User, UserRole } from '../../common/interfaces/Model/User';
import { LoginUserDTO, RegisterUserDTO, UpdateUserDTO } from '../../common/interfaces/DTO/userDTO';

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

export const defaultAdminUser: ResponseWithCount<User[]> = {
    data: [],
    count: -1,
};

export const defaultOrderList: OrderList = {
    status: 'WAITING',
    orderItem: [],
    ID: '',
    createDate: '',
    address: '',
    phoneNumber: '',
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
    address: '',
    phoneNumber: '',
};
