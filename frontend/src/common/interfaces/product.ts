import { color } from './color';
import { image } from './image';
import { size } from './size';
import { type } from './type';

export enum ProductStatus {
    OUT_OF_STOCK,
    IN_STOCK,
}
export interface Product {
    ID: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    status: ProductStatus;
    images: image[];
    types: type[];
    colors: color[];
    sizes: size[];
    createDate: string;
    productAvatar: string;
}

export interface ProductToShow {
    ID: string;
    name: string;
    quantity: number;
    price: number;
    status: ProductStatus;
    productAvatar: string;
}

export interface ProductState {
    productToShowList: ProductToShow[];
    currentProduct: Product;
}
