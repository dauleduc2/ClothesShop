import { color } from './Color';
import { image } from './Image';
import { size } from './Size';
import { type } from './Type';

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
