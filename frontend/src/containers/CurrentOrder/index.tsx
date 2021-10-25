import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState, store } from '../../redux';
import { orderListThunk } from '../../redux/orderList/orderListThunk';
import { Link } from 'react-router-dom';
import { OrderListState } from '../../common/interfaces/Redux/orderList';
import * as urlLink from '../../consts/url';
interface RouteParams {
    orderID: string;
}
interface CurrentOrderProps extends RouteComponentProps<RouteParams> {}

const CurrentOrder: React.FunctionComponent<CurrentOrderProps> = ({ match }) => {
    const orderListState = useSelector<RootState, OrderListState>((state) => state.orderList);
    const total = orderListState.currentList.orderItem.reduce((prev, current) => {
        return prev + current.price * current.amount;
    }, 0);
    React.useEffect(() => {
        store.dispatch(orderListThunk.getOrderListById(match.params.orderID));
    }, [match.params.orderID]);
    return (
        <main className="flex-1 w-full p-16 px-4 py-16 mx-auto lg:w-8/12 sm:px-6 lg:pb-24 lg:px-8">
            <div className="max-w-xl">
                <h1 className="mt-8 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            </div>

            <section aria-labelledby="recent-heading" className="mt-8">
                <h2 id="recent-heading" className="sr-only">
                    Recent orders
                </h2>

                <div className="space-y-20">
                    <div>
                        <div className="px-4 py-8 rounded-lg bg-gray-50 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                            <dl className="flex-auto space-y-6 text-sm text-gray-600 divide-y divide-gray-200 sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-full lg:flex-none lg:gap-x-8">
                                <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt className="font-medium text-gray-900">Order ID</dt>
                                    <dd className="sm:mt-1">#{orderListState.currentList.ID.substring(0, 8)}</dd>
                                </div>
                                <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt className="font-medium text-gray-900">Date placed</dt>
                                    <dd className="sm:mt-1">
                                        <time>{new Date(orderListState.currentList.createDate).toDateString()}</time>
                                    </dd>
                                </div>
                                <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                    <dt>Total amount</dt>
                                    <dd className="sm:mt-1">{total}$</dd>
                                </div>
                                <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt className="font-medium text-gray-900">Status</dt>
                                    <dd className="sm:mt-1">
                                        {orderListState.currentList.status === 'WAITING' && (
                                            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">
                                                Waiting
                                            </span>
                                        )}
                                        {orderListState.currentList.status === 'SHIPPING' && (
                                            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-blue-800 text-xs font-medium bg-blue-100 rounded-full">
                                                Shipping
                                            </span>
                                        )}
                                        {orderListState.currentList.status === 'DONE' && (
                                            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                                Done
                                            </span>
                                        )}
                                        {orderListState.currentList.status === 'CANCEL' && (
                                            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full">
                                                Cancel
                                            </span>
                                        )}
                                    </dd>
                                </div>
                                <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                    <dt className="sm:mt-8">Address</dt>
                                    <dd className="sm:mt-1">{orderListState.currentList.address}</dd>
                                </div>
                                <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                    <dt className="sm:mt-8">Phone number</dt>
                                    <dd className="sm:mt-1">{orderListState.currentList.phoneNumber}</dd>
                                </div>
                            </dl>
                        </div>
                        {/* <div className="px-4 py-6 rounded-lg bg-gray-50 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                            <div className="border-t border-gray-200 sm:p-0">
                                <dl className="flex flex-col sm:divide-y sm:divide-gray-200">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium text-gray-900">Address</dt>
                                        <dd className="mt-1 ml-0 text-sm text-gray-900 lg:ml-20 sm:mt-0 sm:col-span-2">
                                            {orderListState.currentList.address}
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium text-gray-900">Phone number</dt>
                                        <dd className="mt-1 ml-0 text-sm text-gray-900 lg:ml-20 sm:mt-0 sm:col-span-2">
                                            {orderListState.currentList.phoneNumber}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div> */}
                        <table className="w-full mt-4 text-gray-500 sm:mt-6">
                            <thead className="text-sm text-left text-gray-500 sr-only sm:not-sr-only">
                                <tr>
                                    <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                        Product
                                    </th>
                                    <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                        Price
                                    </th>
                                    <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                        Amount
                                    </th>
                                    <th scope="col" className="w-0 py-3 font-normal text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm border-b border-gray-200 divide-y divide-gray-200 sm:border-t">
                                {orderListState.currentList.orderItem.map((orderItem) => (
                                    <tr key={orderItem.ID}>
                                        <td className="py-6 pr-8">
                                            <div className="flex items-center">
                                                <img
                                                    src={`${urlLink.ENV_SERVER}/${orderItem.product.productAvatar}`}
                                                    alt={orderItem.product.name}
                                                    className="object-cover object-center w-16 h-16 mr-6 rounded"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {orderItem.product.name}
                                                    </div>
                                                    <div className="mt-1 ">
                                                        {orderItem.color.name} - {orderItem.size.name}
                                                    </div>
                                                    <div className="mt-1 sm:hidden">{orderItem.price}$</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-6 pr-8 sm:table-cell">{orderItem.price}$</td>
                                        <td className="hidden py-6 pr-8 sm:table-cell">{orderItem.amount}</td>
                                        <td className="py-6 font-medium text-right whitespace-nowrap">
                                            <Link
                                                to={`${urlLink.PRODUCT}/${orderItem.product.name}`}
                                                className="text-indigo-600"
                                            >
                                                View Product
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CurrentOrder;
