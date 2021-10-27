import { Color } from './Color';
import { Product } from './Product';
import { Size } from './Size';

export interface OrderItem {
    amount: number;
    price: number;
    size: Size;
    color: Color;
    ID: string;
    createDate: string;
    product: Partial<Product>;
}
