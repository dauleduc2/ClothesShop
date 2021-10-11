import * as React from 'react';

import { RadioGroup } from '@headlessui/react';
import { RouteComponentProps } from 'react-router';
import { RootState, store } from '../../redux';
import { productThunk } from '../../redux/product/productThunk';
import { useSelector } from 'react-redux';
import { ProductState } from '../../common/interfaces/product';
import { SubmitHandler, useForm } from 'react-hook-form';
import { color } from '../../common/interfaces/color';
import { size } from '../../common/interfaces/size';
import { ProductInCart } from '../../common/interfaces/cart';
import { cartListAction } from '../../redux/cart/cart';
import * as NotificationHelper from '../../utils/notificationHelper';
interface RouteParams {
    productName: string;
}

interface ProductDetailsProps extends RouteComponentProps<RouteParams> {}

type Inputs = {
    amount: string;
};

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const defaultColor = {
    ID: -1,
    hexCode: '',
    name: '',
};

const defaultSize = { ID: -1, name: '' };

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({ match }) => {
    const [selectedColor, setSelectedColor] = React.useState<color>(defaultColor);
    const [selectedSize, setSelectedSize] = React.useState<size>(defaultSize);
    const [amount, setAmount] = React.useState<number>(1);
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    const { handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = () => {
        if (JSON.stringify(selectedColor) === JSON.stringify(defaultColor)) {
            NotificationHelper.warning('Not enough infomation', 'Please choose color before add this product to cart');
            return;
        }
        if (JSON.stringify(selectedSize) === JSON.stringify(defaultSize)) {
            NotificationHelper.warning('Not enough infomation', 'Please choose size before add this product to cart');
            return;
        }

        const product: ProductInCart = {
            name: productState.currentProduct.name,
            size: selectedSize,
            color: selectedColor,
            quantity: amount,
            productAvatar: productState.currentProduct.productAvatar,
            price: productState.currentProduct.price,
        };
        store.dispatch(cartListAction.addProduct(product));
        setSelectedColor(defaultColor);
        setSelectedSize(defaultSize);
        setAmount(1);
        NotificationHelper.success('Add product to cart success!');
    };

    React.useEffect(() => {
        const { productName } = match.params;
        store.dispatch(productThunk.getSpecificProduct(productName));
    }, [match.params]);
    return (
        <div className="overflow-y-auto h-contentHeight">
            <div className="bg-white">
                <div className="pt-6 pb-16 sm:pb-24">
                    <nav aria-label="Breadcrumb" className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"></nav>
                    <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                            <div className="lg:col-start-8 lg:col-span-5">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-medium text-gray-900">
                                        {productState.currentProduct.name}
                                    </h1>
                                    <p className="text-xl font-medium text-gray-900">
                                        {productState.currentProduct.price}$
                                    </p>
                                </div>
                            </div>

                            {/* Image gallery */}
                            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                                <h2 className="sr-only">Images</h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                    <img
                                        src={`${process.env.REACT_APP_SERVER_URL}/${productState.currentProduct.productAvatar}`}
                                        alt="productAvatar"
                                        className="w-full h-full rounded-lg lg:col-span-2 lg:row-span-2"
                                    />
                                    {productState.currentProduct.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`${process.env.REACT_APP_SERVER_URL}/${image.imageLink}`}
                                            alt={image.ID}
                                            className="hidden rounded-lg shadow-xl lg:block"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 lg:col-span-5">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Color picker */}
                                    <div className="flex flex-col">
                                        <h2 className="self-start text-sm font-medium text-gray-900 ring-gray">
                                            Color
                                        </h2>
                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {productState.currentProduct.colors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                !active && checked ? 'ring-2' : '',
                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                            )
                                                        }
                                                        style={{
                                                            boxShadow: `inset 0 0 0 calc(1px + 0) ${color.hexCode}`,
                                                        }}
                                                    >
                                                        <RadioGroup.Label as="p" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                            )}
                                                            style={{ backgroundColor: color.hexCode }}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/* Size picker */}
                                    <div className="mt-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-sm font-medium text-gray-900">Size</h2>
                                        </div>

                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                            <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                {productState.currentProduct.sizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                true
                                                                    ? 'cursor-pointer focus:outline-none'
                                                                    : 'opacity-25 cursor-not-allowed',
                                                                active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                                                checked
                                                                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                                                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                                'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-sm font-medium text-gray-900">Amount</h2>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <button
                                                type="button"
                                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                onClick={() => {
                                                    setAmount((preValue) => {
                                                        if (preValue !== 1) {
                                                            return preValue - 1;
                                                        }
                                                        return 1;
                                                    });
                                                }}
                                            >
                                                <svg
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                            <input className="w-3 mx-3 text-lg text-gray-700" defaultValue={amount} />
                                            <button
                                                type="button"
                                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                onClick={() => {
                                                    setAmount(() => amount + 1);
                                                }}
                                            >
                                                <svg
                                                    className="w-8 h-8"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add to cart
                                    </button>
                                </form>

                                {/* Product details */}
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-left text-gray-900">Description</h2>

                                    <div
                                        className="mt-4 prose-sm prose text-left text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: productState.currentProduct.description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
