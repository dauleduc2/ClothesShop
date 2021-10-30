import TotalPriceOfTypeOnTime from './TotalPriceOfTypeOnTime';
import TotalPriceOnTime from './TotalPriceOnTime';
import TotalSaleOfTypeOnTime from './TotalSaleOfTypeOnTime';
import TotalSaleOnTime from './TotalSaleOnTime';

interface ProductAnalystProps {}

const ProductAnalyst: React.FunctionComponent<ProductAnalystProps> = () => {
    return (
        <div className="flex flex-col justify-between flex-1 w-full ">
            <div className="flex justify-between">
                <TotalSaleOnTime />
                <TotalPriceOnTime />
            </div>
            <div className="flex justify-start space-x-40 ">
                <TotalSaleOfTypeOnTime />
                <TotalPriceOfTypeOnTime />
            </div>
        </div>
    );
};

export default ProductAnalyst;
