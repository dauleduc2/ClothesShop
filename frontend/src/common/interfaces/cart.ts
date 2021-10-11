import { color } from './color';
import { size } from './size';

export interface ProductInCart {
    name: string;
    quantity: number;
    price: number;
    productAvatar: string;
    color: color;
    size: size;
}

export interface CartState {
    productList: ProductInCart[];
}
export interface CartAction<T> {
    type: string;
    payload: T;
}
