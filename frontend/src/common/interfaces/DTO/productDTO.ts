import { Product } from '../Model/Product';

export interface ProductToShowDTO
    extends Pick<Product, 'ID' | 'name' | 'quantity' | 'price' | 'status' | 'productAvatar'> {}

export interface ProductAddFormDTO extends Pick<Product, 'name' | 'quantity' | 'price' | 'description'> {
    images: File[];
    type: number;
    sizes: number[];
    colors: number[];
    productAvatar: File;
}
