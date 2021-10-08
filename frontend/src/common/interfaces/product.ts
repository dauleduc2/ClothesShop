import { color } from './color';
import { image } from './image';
import { size } from './size';
import { type } from './type';

export interface Product {
    ID: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    status: number;
    image: image[];
    type: type[];
    color: color[];
    size: size[];
    createDate: string;
}

export interface ProductToShow {
    name: string;
    quantity: number;
    price: number;
    images: image[];
    type: type[];
    colors: color[];
}

export interface ProductState {
    productList: ProductToShow[];
}
