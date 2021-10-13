import { ProductInCart } from '../../common/interfaces/cart';
import { Product } from '../../common/interfaces/product';
import { User } from '../../common/interfaces/user';

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
    status: '',
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
    role: -1,
    createDate: '',
};
