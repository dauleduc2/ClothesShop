import { ProductToShowDTO } from '../DTO/productDTO';
import { Product } from '../Model/Product';

export interface ProductState {
    productToShowList: ProductToShowDTO[];
    currentProduct: Product;
    admin: {
        productList: Product[];
        count: number;
    };
}
