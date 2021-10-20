import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import React from 'react';
import { RootState, store } from '../../redux';
import { orderListThunk } from '../../redux/orderList/orderListThunk';
import { useSelector } from 'react-redux';
import { OrderList, OrderListState, OrderStatus } from '../../common/interfaces/orderList';
import { capitalizeFirstLetter } from '../../utils/textHelper';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
interface OrderManagerProps extends RouteComponentProps {}

interface QueryProps {
    limit: string;
    page: string;
}

const status = ['Waiting', 'Shipping', 'Done', 'Cancel'];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const OrderManagerPage: React.FunctionComponent<OrderManagerProps> = ({ location }) => {
    let params: QueryProps = queryString.parse(location.search) as any;
    const orderListState = useSelector<RootState, OrderListState>((state) => state.orderList);
    const [selected, setSelected] = useState('Shipping');
    const [currentOrderList, setCurrentOrderList] = useState<OrderList>();

    React.useEffect(() => {
        store.dispatch(orderListThunk.adminGetAllOrderList({ limit: params.limit, page: params.page }));
    }, [params.limit, params.page]);
    return (
        <>
            <div className="flex w-full">
                <div className="w-7/12 -my-2 overflow-x-auto text-left sm:-mx-6 lg:-mx-8 intro-y">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Total price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderListState.admin.currentToShow.map((order, index) => (
                                        <tr key={order.ID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                #{order.ID.substring(0, 8)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {order.user.fullName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(order.createDate).toDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                $
                                                {order.orderItem.reduce((prev, current) => {
                                                    return prev + current.amount * current.price;
                                                }, 0)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {order.status === OrderStatus.CANCEL && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-gray-800">
                                                        {capitalizeFirstLetter(order.status)}
                                                    </span>
                                                )}
                                                {order.status === OrderStatus.DONE && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-gray-800">
                                                        {capitalizeFirstLetter(order.status)}
                                                    </span>
                                                )}
                                                {order.status === OrderStatus.SHIPPING && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-gray-800">
                                                        {capitalizeFirstLetter(order.status)}
                                                    </span>
                                                )}
                                                {order.status === OrderStatus.WAITING && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-yellow-100 text-gray-800">
                                                        {capitalizeFirstLetter(order.status)}
                                                    </span>
                                                )}
                                            </td>
                                            <td
                                                className="px-6 py-4 text-sm font-medium text-right cursor-pointer whitespace-nowrap"
                                                onClick={() => {
                                                    setCurrentOrderList(order);
                                                    setSelected(capitalizeFirstLetter(order.status));
                                                }}
                                            >
                                                <div className="text-indigo-600 hover:text-indigo-900">View</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Order summary */}
                {currentOrderList && (
                    <section
                        aria-labelledby="summary-heading"
                        className="flex-grow max-w-lg px-4 py-6 ml-20 bg-gray-100 rounded-lg sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 intro-y"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex flex-col items-center justify-between pt-4 border-t border-gray-200">
                                {currentOrderList.orderItem.map((orderItem) => {
                                    return (
                                        <div className="flex justify-between w-full mt-4" key={orderItem.ID}>
                                            <dt className="flex items-center text-base text-gray-600">
                                                {orderItem.product.name} x {orderItem.amount} x ${orderItem.price}
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">
                                                ${orderItem.amount * orderItem.price}
                                            </dd>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">
                                    $
                                    {currentOrderList.orderItem.reduce((prev, current) => {
                                        return prev + current.amount * current.price;
                                    }, 0)}
                                </dd>
                            </div>
                        </dl>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <span className="block truncate">{selected}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {status.map((status) => (
                                            <Listbox.Option
                                                key={status}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={status}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={classNames(
                                                                selected ? 'font-semibold' : 'font-normal',
                                                                'block truncate'
                                                            )}
                                                        >
                                                            {status}
                                                        </span>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                )}
                                                            >
                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                        <div className="mt-6">
                            <button
                                type="button"
                                className="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                // onClick={onHandleOrderClick}
                            >
                                Submit
                            </button>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default OrderManagerPage;
