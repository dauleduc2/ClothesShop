import * as React from 'react';
import { ProductToShowDTO } from '../../common/interfaces/DTO/productDTO';
import PaginationBar from '../common/PaginationBar';
import ProductBox from '../Product/ProductBox';
import * as urlLink from '../../consts/url';
interface ProductContainerProps {
    products: ProductToShowDTO[];
    count: number;
    limit: number;
    page: number;
}
const ProductContainer: React.FunctionComponent<ProductContainerProps> = ({ products, count, limit, page }) => {
    return (
        <div className="bg-white">
            <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 mb-7 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => {
                        return (
                            <ProductBox
                                key={product.ID}
                                imgUrl={product.productAvatar}
                                name={product.name}
                                price={product.price}
                                quantity={product.quantity}
                            />
                        );
                    })}
                </div>
                <PaginationBar limit={limit} page={page} numberOfItem={count} routeUrl={urlLink.HOME} />
            </div>
        </div>
    );
};

export default ProductContainer;
