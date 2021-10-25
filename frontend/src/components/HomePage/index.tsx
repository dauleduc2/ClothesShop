import ProductContainer from '../ProductContainer';
import React from 'react';
import { RootState, store } from '../../redux';
import { productThunk } from '../../redux/product/productThunk';
import { useSelector } from 'react-redux';
import { ProductState } from '../../common/interfaces/Redux/product';
interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    React.useEffect(() => {
        store.dispatch(productThunk.getAllProduct());
    }, []);
    return (
        <div className="flex-1 mt-5 text-4xl">
            <ProductContainer products={productState.productToShowList} />
        </div>
    );
};

export default HomePage;
