import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { CartState } from '../../common/interfaces/cart';
import { RootState, store } from '../../redux';
import { cartListAction } from '../../redux/cart/cart';
import { Link } from 'react-router-dom';
import { UIState } from '../../common/interfaces/UI';
import { UIListAction } from '../../redux/UI/UI';
import { OrderItemToSend, OrderListToSend } from '../../common/interfaces/orderList';
import { orderListThunk } from '../../redux/orderList/orderListThunk';

interface CartProps {}

const Cart: React.FunctionComponent<CartProps> = () => {
    const cartState = useSelector<RootState, CartState>((state) => state.cart);
    const UIState = useSelector<RootState, UIState>((state) => state.UI);
    const [totalPrice, setTotalPrice] = React.useState(0);
    //
    React.useEffect(() => {
        if (UIState.confirmPopUp.isConfirm) {
            store.dispatch(cartListAction.deleteProduct(UIState.confirmPopUp.productToDelete));
        }
        store.dispatch(UIListAction.resetConfirmPopup());
    }, [UIState.confirmPopUp.isConfirm]);
    //recalculate the total price when a product in cart was changed
    React.useEffect(() => {
        setTotalPrice(
            cartState.productList.reduce((total, current) => {
                return total + current.price * current.quantity;
            }, 0)
        );
    }, [cartState.productList]);

    //
    const onHandleOrderClick = async () => {
        const orderItemList = cartState.productList.map<OrderItemToSend>((item) => {
            return {
                amount: item.quantity,
                colorID: item.color.ID,
                sizeID: item.size.ID,
                productID: item.ID,
            };
        });
        const orderListToSend: OrderListToSend = {
            status: 0,
            orderItem: orderItemList,
        };

        // const result = await orderListApi.addNewOrderList(orderListToSend);
        const result = await store.dispatch(orderListThunk.addOrderList(orderListToSend));
        if (result.meta.requestStatus === 'fulfilled') {
            store.dispatch(cartListAction.resetState());

            store.dispatch(
                UIListAction.setSuccessModel({
                    title: 'Order success',
                    message: 'You order was success, please wait our contact via your phone for more detail',
                })
            );
        }
    };
    return (
        <>
            {cartState.productList.length === 0 ? (
                <div className="flex flex-col justify-center w-full mt-32 align-middle">
                    <img src="/images/empty-cart.png" className="m-auto w-80" alt="empty cart" />
                    <h2 className="m-auto text-lg font-semibold">Your cart is empty </h2>
                    <p className="m-auto text-base">Go shopping now to see product in your cart</p>
                    <Link
                        className="inline-flex items-center px-4 py-2 m-auto mt-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm w-max hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        to="/"
                    >
                        Shopping now!
                    </Link>
                </div>
            ) : (
                <div className="bg-white">
                    <div className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Shopping Cart
                        </h1>
                        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your shopping cart
                                </h2>

                                <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                    {cartState.productList.map((product, productIdx) => (
                                        <li key={productIdx} className="flex py-6 sm:py-10 intro-x">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={`${process.env.REACT_APP_SERVER_URL}/${product.productAvatar}`}
                                                    alt={product.name}
                                                    className="object-cover object-center w-24 h-24 rounded-md sm:w-48 sm:h-48"
                                                />
                                            </div>

                                            <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a
                                                                    href={`/product/${product.name}`}
                                                                    className="font-medium text-gray-700 capitalize hover:text-gray-800"
                                                                >
                                                                    {product.name}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="flex mt-1 text-sm">
                                                            <p className="text-gray-500">{product.color.name}</p>

                                                            <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
                                                                {product.size.name}
                                                            </p>
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                                            {product.price}$
                                                        </p>
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <div className="flex items-center mt-2">
                                                            <button
                                                                type="button"
                                                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                onClick={() => {
                                                                    if (product.quantity - 1 === 0) {
                                                                        store.dispatch(
                                                                            UIListAction.setConfirmPopUp({
                                                                                title: 'This action may not be return',
                                                                                message:
                                                                                    'Do you really want to delete this product from your cart?',
                                                                            })
                                                                        );
                                                                        store.dispatch(
                                                                            UIListAction.setProductToDelete(product)
                                                                        );
                                                                    } else {
                                                                        store.dispatch(
                                                                            cartListAction.updateProduct({
                                                                                ...product,
                                                                                quantity: product.quantity - 1,
                                                                            })
                                                                        );
                                                                    }
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
                                                            <input
                                                                className="w-3 mx-3 text-lg text-gray-700"
                                                                value={product.quantity}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                                                onClick={() => {
                                                                    store.dispatch(
                                                                        cartListAction.updateProduct({
                                                                            ...product,
                                                                            quantity: product.quantity + 1,
                                                                        })
                                                                    );
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

                                                        <div className="absolute top-0 right-0">
                                                            <button
                                                                type="button"
                                                                className="inline-flex p-2 -m-2 text-gray-400 hover:text-gray-500"
                                                                onClick={() => {
                                                                    store.dispatch(
                                                                        UIListAction.setConfirmPopUp({
                                                                            title: 'This action may not be return',
                                                                            message:
                                                                                'Do you really want to delete this product from your cart?',
                                                                        })
                                                                    );
                                                                    store.dispatch(
                                                                        UIListAction.setProductToDelete(product)
                                                                    );
                                                                }}
                                                            >
                                                                <span className="sr-only">Remove</span>
                                                                <XIcon className="w-5 h-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Order summary */}
                            <section
                                aria-labelledby="summary-heading"
                                className="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 intro-y"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Order summary
                                </h2>

                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Subtotal</dt>
                                        <dd className="text-sm font-medium text-gray-900">{totalPrice}$</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <dt className="flex items-center text-sm text-gray-600">
                                            <span>Shipping estimate</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">-</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <dt className="flex text-sm text-gray-600">
                                            <span>Tax estimate</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">-</dd>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">{totalPrice}$</dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                        onClick={onHandleOrderClick}
                                    >
                                        Order now
                                    </button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;
