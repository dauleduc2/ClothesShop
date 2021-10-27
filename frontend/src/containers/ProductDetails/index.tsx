import * as React from 'react';

import { RadioGroup } from '@headlessui/react';
import { RouteComponentProps } from 'react-router';
import { RootState, store } from '../../redux';
import { productThunk } from '../../redux/product/productThunk';
import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Color } from '../../common/interfaces/Model/Color';
import { Size } from '../../common/interfaces/Model/Size';
import { ProductInCartDTO } from '../../common/interfaces/DTO/cartDTO';
import { cartListAction } from '../../redux/cart/cart';
import * as NotificationHelper from '../../utils/notificationHelper';
import { defaultColor, defaultSize } from '../../redux/common/defaultValue';
import MinusIcon from '../../components/common/icon/Minus';
import AddIcon from '../../components/common/icon/Add';
import { ProductState } from '../../common/interfaces/Redux/product';
import { UserState } from '../../common/interfaces/Redux/user';
import * as urlLink from '../../consts/url';
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

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({ match }) => {
    const [selectedColor, setSelectedColor] = React.useState<Color>(defaultColor);
    const [selectedSize, setSelectedSize] = React.useState<Size>(defaultSize);
    const [amount, setAmount] = React.useState<number>(1);
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const { handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = () => {
        if (!userState.isLogin) {
            NotificationHelper.warning('Require', 'You need to login to use this function');
            return;
        }
        if (JSON.stringify(selectedColor) === JSON.stringify(defaultColor)) {
            NotificationHelper.warning('Not enough infomation', 'Please choose color before add this product to cart');
            return;
        }
        if (JSON.stringify(selectedSize) === JSON.stringify(defaultSize)) {
            NotificationHelper.warning('Not enough infomation', 'Please choose size before add this product to cart');
            return;
        }

        const product: ProductInCartDTO = {
            ID: productState.currentProduct.ID,
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
        <div className="flex-1 pt-16">
            <div className="bg-white">
                <div className="pt-6 pb-16 sm:pb-24">
                    <nav aria-label="Breadcrumb" className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"></nav>
                    <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                            <div className="lg:col-start-8 lg:col-span-5 intro-y">
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

                                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                                    <img
                                        src={`${urlLink.ENV_SERVER}/${productState.currentProduct.productAvatar}`}
                                        alt="productAvatar"
                                        className="w-full rounded-lg lg:col-span-2 lg:row-span-2 intro-y"
                                    />
                                    {productState.currentProduct.images.map((image, index) => (
                                        <img
                                            key={image.ID}
                                            src={`${urlLink.ENV_SERVER}/${image.imageLink}`}
                                            alt={image.ID}
                                            className="hidden rounded-lg shadow-xl lg:block intro-y"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 lg:col-span-5 intro-y">
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
                                                        key={color.ID}
                                                        value={color}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                active && checked && 'ring ring-offset-1',
                                                                !active && checked && 'ring-2',
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
                                                        key={size.ID}
                                                        value={size}
                                                        className={({ active, checked }) =>
                                                            classNames(
                                                                true
                                                                    ? 'cursor-pointer focus:outline-none'
                                                                    : 'opacity-25 cursor-not-allowed',
                                                                active && 'ring-2 ring-offset-2 ring-indigo-500',
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
                                                <MinusIcon />
                                            </button>
                                            <input className="w-3 mx-3 text-lg text-gray-700" value={amount} />
                                            <button
                                                type="button"
                                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                onClick={() => {
                                                    setAmount(() => amount + 1);
                                                }}
                                            >
                                                <AddIcon />
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
