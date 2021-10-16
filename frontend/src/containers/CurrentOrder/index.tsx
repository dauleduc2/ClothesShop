import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { OrderListState } from '../../common/interfaces/orderList';
import { RootState, store } from '../../redux';
import { orderListThunk } from '../../redux/orderList/orderListThunk';
import { Link } from 'react-router-dom';
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
        <main className="w-full px-4 py-16 mx-auto lg:w-8/12 sm:px-6 lg:pb-24 lg:px-8">
            <div className="max-w-xl">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            </div>

            <section aria-labelledby="recent-heading" className="mt-16">
                <h2 id="recent-heading" className="sr-only">
                    Recent orders
                </h2>

                <div className="space-y-20">
                    <div>
                        <h3 className="sr-only">
                            Order placed on <time>{orderListState.currentList.createDate}</time>
                        </h3>

                        <div className="px-4 py-6 rounded-lg bg-gray-50 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                            <dl className="flex-auto space-y-6 text-sm text-gray-600 divide-y divide-gray-200 sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                <div className="flex justify-between sm:block">
                                    <dt className="font-medium text-gray-900">Date placed</dt>
                                    <dd className="sm:mt-1">
                                        <time>{orderListState.currentList.createDate}</time>
                                    </dd>
                                </div>
                                <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt className="font-medium text-gray-900">Order ID</dt>
                                    <dd className="sm:mt-1">{orderListState.currentList.ID.substring(0, 8)}</dd>
                                </div>
                                <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                    <dt>Total amount</dt>
                                    <dd className="sm:mt-1">{total}$</dd>
                                </div>
                            </dl>
                        </div>

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
                                                    src={`${process.env.REACT_APP_SERVER_URL}/${orderItem.product.productAvatar}`}
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
                                            <Link to={`/product/${orderItem.product.name}`} className="text-indigo-600">
                                                View<span className="hidden lg:inline"> Product</span>
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