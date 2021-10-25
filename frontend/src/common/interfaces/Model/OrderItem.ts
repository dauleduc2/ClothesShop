import { color } from './Color';
import { Product } from './Product';
import { size } from './Size';

export interface OrderItem {
    amount: number;
    price: 10;
    size: size;
    color: color;
    ID: string;
    createDate: string;
    product: Partial<Product>;
}
