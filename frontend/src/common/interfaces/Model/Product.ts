import { Color } from './Color';
import { Image } from './Image';
import { Size } from './Size';
import { Type } from './Type';

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
    images: Image[];
    types: Type[];
    colors: Color[];
    sizes: Size[];
    createDate: string;
    productAvatar: string;
}
