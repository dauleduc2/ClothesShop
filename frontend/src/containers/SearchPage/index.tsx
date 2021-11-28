import { RouteComponentProps } from 'react-router';
import React from 'react';
import { productApi } from '../../api/productApi';
import { ProductToShowDTO } from '../../common/interfaces/DTO/productDTO';
import ProductBox from '../../components/Product/ProductBox';
interface RouteParams {
    name: string;
}
interface SearchPageProps extends RouteComponentProps<RouteParams> {}

const SearchPage: React.FunctionComponent<SearchPageProps> = ({ match }) => {
    const [products, setProducts] = React.useState<ProductToShowDTO[]>([]);
    const { name } = match.params;
    React.useEffect(() => {
        async function getProductList() {
            const res = await productApi.searchProductByName(name);
            setProducts(res.data.data);
        }
        getProductList();
    }, [name]);
    return (
        <div className="flex-1 p-16">
            <div className="bg-white">
                <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 id="category-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Result for {name}
                    </h2>
                    <div className="grid grid-cols-1 mt-5 mb-7 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
