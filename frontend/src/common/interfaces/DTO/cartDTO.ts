import { Color } from '../Model/Color';
import { Product } from '../Model/Product';
import { Size } from '../Model/Size';

export interface ProductInCartDTO extends Pick<Product, 'ID' | 'name' | 'quantity' | 'price' | 'productAvatar'> {
    color: Color;
    size: Size;
}
