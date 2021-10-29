import { ProductToShowDTO } from '../DTO/productDTO';
import { Product } from '../Model/Product';

export interface ProductState {
    productToShowList: {
        data: ProductToShowDTO[];
        count: number;
    };
    currentProduct: Product;
    admin: {
        productList: Product[];
        count: number;
    };
}
