import { color } from '../Model/Color';
import { Product } from '../Model/Product';
import { size } from '../Model/Size';

export interface ProductInCartDTO extends Pick<Product, 'ID' | 'name' | 'quantity' | 'price' | 'productAvatar'> {
    color: color;
    size: size;
}
