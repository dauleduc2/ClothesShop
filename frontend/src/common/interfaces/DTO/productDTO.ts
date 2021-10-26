import { Product } from '../Model/Product';

export interface ProductToShowDTO
    extends Pick<Product, 'ID' | 'name' | 'quantity' | 'price' | 'status' | 'productAvatar'> {}
