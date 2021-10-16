import { Link } from 'react-router-dom';

interface ProductBoxProps {
    imgUrl: string;
    price: number;
    name: string;
    quantity: number;
}
const ProductBox: React.FunctionComponent<ProductBoxProps> = ({ imgUrl, price, name }) => {
    return (
        <Link to={`/product/${name.split(' ').join('-')}`} className="text-left group intro-y">
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg shadow-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={`${process.env.REACT_APP_SERVER_URL}/${imgUrl}`}
                    alt={name}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{price}$</p>
        </Link>
    );
};

export default ProductBox;
