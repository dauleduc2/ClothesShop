import ProductContainer from '../../components/ProductContainer';
import React from 'react';
import { RootState, store } from '../../redux';
import { productThunk } from '../../redux/product/productThunk';
import { useSelector } from 'react-redux';
import { ProductState } from '../../common/interfaces/Redux/product';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { AdminQuery } from '../../common/interfaces/Common/query';
interface HomePageProps extends RouteComponentProps {}

const HomePage: React.FunctionComponent<HomePageProps> = ({ location }) => {
    let params: AdminQuery = queryString.parse(location.search) as any;
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    React.useEffect(() => {
        store.dispatch(productThunk.getAllProduct({ limit: Number(params.limit), page: Number(params.page) }));
    }, [params.limit, params.page]);
    return (
        <div className="flex-1 mt-5 text-4xl">
            <ProductContainer
                products={productState.productToShowList.data}
                count={productState.productToShowList.count}
                limit={params.limit}
                page={params.page}
            />
        </div>
    );
};

export default HomePage;
