import { Product } from '../Model/Product';

export interface ProductToShowDTO
    extends Pick<Product, 'ID' | 'name' | 'quantity' | 'price' | 'status' | 'productAvatar'> {}

export interface ProductAddFormDTO
    extends Pick<Product, 'name' | 'quantity' | 'price' | 'description' | 'productAvatar'> {
    images: string[];
    types: number[];
    sizes: number[];
    colors: number[];
}
