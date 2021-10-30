import TotalPriceOnTime from './TotalPriceOnTime';
import TotalSaleOnTime from './TotalSaleOnTime';

interface ProductAnalystProps {}

const ProductAnalyst: React.FunctionComponent<ProductAnalystProps> = () => {
    return (
        <div className="flex flex-wrap justify-between w-full">
            <TotalSaleOnTime />
            <TotalPriceOnTime />
        </div>
    );
};

export default ProductAnalyst;
