import { color } from './Color';
import { image } from './Image';
import { size } from './Size';
import { type } from './Type';

export enum ProductStatus {
    UNAVAILABLE = 'UNAVAILABLE',
    AVAILABLE = 'AVAILABLE',
}
export type ProductStatusString = keyof typeof ProductStatus;
export interface Product {
    ID: string;
    name: string;
    quantity: number;
    price: number;
    description: string;
    status: ProductStatusString;
    images: image[];
    types: type[];
    colors: color[];
    sizes: size[];
    createDate: string;
    productAvatar: string;
}
