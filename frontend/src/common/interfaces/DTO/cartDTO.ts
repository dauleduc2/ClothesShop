import { color } from '../Model/Color';
import { size } from '../Model/Size';

export interface ProductInCart {
    ID: string;
    name: string;
    quantity: number;
    price: number;
    productAvatar: string;
    color: color;
    size: size;
}
