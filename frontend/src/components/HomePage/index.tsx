import ProductContainer from '../ProductContainer';
import React from 'react';
import { RootState, store } from '../../redux';
import { productThunk } from '../../redux/product/productThunk';
import { useSelector } from 'react-redux';
import { ProductState } from '../../common/interfaces/product';
interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    React.useEffect(() => {
        store.dispatch(productThunk.getAllProduct());
    }, []);
    return (
        <div className="overflow-y-auto text-4xl h-contentHeight">
            <ProductContainer products={productState.productToShowList} />
        </div>
    );
};

export default HomePage;
