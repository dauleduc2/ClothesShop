import * as React from 'react';
import Product from '../Product/Product';

interface ProductContainerProps {
    Products: Array<ProductFields>;
}

export interface ProductFields {
    productId: string;
    imgUrl: string;
    describe: string;
    price: number;
}

const ProductContainer: React.FunctionComponent<ProductContainerProps> = ({ Products }) => {
    function formatCurrency(n: number, currency: string) {
        return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-2 p-0 rounded sm:p-8 sm:gap-4 sm:grid-cols-4">
                {Products.map((item, index) => {
                    return (
                        <Product
                            key={index}
                            describe={item.describe}
                            imgUrl={item.imgUrl}
                            price={formatCurrency(item.price, 'đ')}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductContainer;
