import { Link } from 'react-router-dom';
import React from 'react';
import { RootState, store } from '../../redux';
import { orderListThunk } from '../../redux/orderList/orderListThunk';
import { useSelector } from 'react-redux';
import { OrderListState, OrderStatus } from '../../common/interfaces/orderList';
interface OrderPageProps {}

const OrderPage: React.FunctionComponent<OrderPageProps> = () => {
    const orderListState = useSelector<RootState, OrderListState>((state) => state.orderList);
    React.useEffect(() => {
        store.dispatch(orderListThunk.getAllOrderList());
    }, []);
    return (
        <div className="p-2 lg:p-10">
            {orderListState.orderList.length !== 0 ? (
                <>
                    <h2 className="mb-4">Recent order</h2>
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {orderListState.orderList.map((order, index) => (
                            <li
                                key={index}
                                className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg intro-y"
                            >
                                <div className="flex items-center justify-between w-full p-6 space-x-6">
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                #{order.orderID.substring(0, 8)}
                                            </h3>
                                            {order.status === OrderStatus.WAITING && (
                                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">
                                                    Waiting
                                                </span>
                                            )}
                                            {order.status === OrderStatus.SHIPPING && (
                                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100 rounded-full">
                                                    Shipping
                                                </span>
                                            )}
                                            {order.status === OrderStatus.DONE && (
                                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                    Done
                                                </span>
                                            )}
                                            {order.status === OrderStatus.CANCEL && (
                                                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full">
                                                    Cancel
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 truncate">
                                            Date : {new Date(order.createDate).toDateString()}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 truncate">
                                            Total product : {order.totalProduct}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 truncate">
                                            Total price : {order.totalPrice}
                                        </p>
                                    </div>
                                    {order.status === OrderStatus.WAITING ? (
                                        <div className="p-1 bg-yellow-400 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {order.status === OrderStatus.SHIPPING ? (
                                        <div className="p-1 bg-blue-400 rounded-full">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {order.status === OrderStatus.DONE ? (
                                        <div className="p-1 bg-green-400 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {order.status === OrderStatus.CANCEL ? (
                                        <div className="p-1 bg-red-400 rounded-full">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div>
                                    <div className="flex -mt-px divide-x divide-gray-200">
                                        <div className="flex flex-1 w-0">
                                            <Link
                                                to={`/user/order/${order.orderID}`}
                                                className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                                    />
                                                </svg>
                                                <span className="ml-3">Detail</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <>
                    <div className="flex flex-col justify-center w-full mt-32 align-middle">
                        <img src="/images/empty-cart.png" className="m-auto w-80" alt="empty cart" />
                        <h2 className="m-auto text-lg font-semibold">You have no order yet!</h2>
                        <p className="m-auto text-base text-center">
                            You have to have at least 1 order to see your order history
                        </p>
                        <Link
                            className="inline-flex items-center px-4 py-2 m-auto mt-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm w-max hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            to="/"
                        >
                            Shopping now!
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderPage;
