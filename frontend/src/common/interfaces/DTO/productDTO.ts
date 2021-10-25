import { ProductStatus } from '../Model/Product';

export interface ProductToShowDTO {
    ID: string;
    name: string;
    quantity: number;
    price: number;
    status: ProductStatus;
    productAvatar: string;
}
