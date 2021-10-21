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
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
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
    const [limit, setLimit] = useState<number>(Number(params.limit));
    const [page, setPage] = useState<number>(Number(params.page));

    const paginationConfig = {
        curPage: page,
        numLinksTwoSide: 1,
        totalPage: Math.ceil(orderListState.admin.count / limit),
    };
    //this variable for checking is render truncated box or not
    let isTruncate = false;
    const minRange = paginationConfig.numLinksTwoSide + 4;
    const numberOfTruncLeft = paginationConfig.curPage - paginationConfig.numLinksTwoSide;
    const numberOfTruncRight = paginationConfig.curPage + paginationConfig.numLinksTwoSide;

    React.useEffect(() => {
        setLimit(Number(params.limit));
        setPage(Number(params.page));
        store.dispatch(orderListThunk.adminGetAllOrderList({ limit, page }));
    }, [params.limit, params.page, limit, page]);
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
                                        <tr key={order.ID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
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
                                    {[...Array(limit - orderListState.admin.currentToShow.length)].map(
                                        (value, index) => {
                                            return (
                                                <tr
                                                    className={
                                                        (index + orderListState.admin.currentToShow.length) % 2 === 0
                                                            ? 'bg-white w-full'
                                                            : 'bg-gray-100 w-full'
                                                    }
                                                    key={index}
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium text-gray-800"></span>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between flex-1 sm:hidden">
                            <Link
                                to={`/admin/order?limit=${limit}&page=${page - 1}`}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                            <Link
                                to={`/admin/order?limit=${limit}&page=${page + 1}`}
                                className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{limit * (page - 1) + 1}</span> to{' '}
                                    <span className="font-medium">{limit * page}</span> of{' '}
                                    <span className="font-medium">{orderListState.admin.count}</span> orders
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                                    aria-label="Pagination"
                                >
                                    <Link
                                        to={
                                            page - 1 === 0
                                                ? `/admin/order?limit=${limit}&page=${1}`
                                                : `/admin/order?limit=${limit}&page=${page - 1}`
                                        }
                                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                    </Link>
                                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                                    {[...Array(paginationConfig.totalPage)].map((value, index) => {
                                        const pos = index + 1;
                                        //truncate left
                                        if (pos < paginationConfig.totalPage - minRange + 1) {
                                            if (numberOfTruncLeft > 3 && pos !== 1 && pos <= numberOfTruncLeft - 1) {
                                                if (!isTruncate) {
                                                    isTruncate = true;
                                                    return (
                                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return <></>;
                                            }
                                        }

                                        //truncate right
                                        if (
                                            numberOfTruncRight < paginationConfig.totalPage - 3 + 1 &&
                                            pos !== paginationConfig.totalPage &&
                                            pos > numberOfTruncRight
                                        ) {
                                            // if (paginationConfig.curPage >= paginationConfig.totalPage - minRange) {
                                            if (pos > minRange) {
                                                if (!isTruncate) {
                                                    isTruncate = true;
                                                    return (
                                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                                                            ...
                                                        </span>
                                                    );
                                                }

                                                return <></>;
                                            }
                                        }
                                        //reset truncated when a box is rendered
                                        isTruncate = false;
                                        return (
                                            <Link
                                                to={`/admin/order?limit=${limit}&page=${index + 1}`}
                                                className={
                                                    index + 1 === page
                                                        ? 'relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 bg-indigo-50'
                                                        : 'relative items-center hidden px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 md:inline-flex'
                                                }
                                            >
                                                {index + 1}
                                            </Link>
                                        );
                                    })}

                                    <Link
                                        to={
                                            page === paginationConfig.totalPage
                                                ? `/admin/order?limit=${limit}&page=${paginationConfig.totalPage}`
                                                : `/admin/order?limit=${limit}&page=${page + 1}`
                                        }
                                        className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Order summary */}
                {currentOrderList && (
                    <section
                        aria-labelledby="summary-heading"
                        className="flex-grow max-w-xl px-4 py-6 ml-20 bg-gray-100 rounded-lg sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 intro-y"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex flex-col items-center justify-between pt-4 border-t border-gray-200">
                                <table className="w-full text-gray-500 ">
                                    <thead className="text-sm text-left text-gray-500 ">
                                        <tr>
                                            <th scope="col" className="py-3 pr-8 font-normal ">
                                                Product
                                            </th>
                                            <th
                                                scope="col"
                                                className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                                            >
                                                Amount
                                            </th>
                                            <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                Price
                                            </th>
                                            <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm border-b border-gray-200 divide-y divide-gray-200 sm:border-t">
                                        {currentOrderList.orderItem.map((orderItem) => {
                                            return (
                                                <tr key={orderItem.ID}>
                                                    <td className="py-1 pr-3">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={`${process.env.REACT_APP_SERVER_URL}/${orderItem.product.productAvatar}`}
                                                                alt={orderItem.product.name}
                                                                className="object-cover object-center w-12 h-12 mr-6 rounded"
                                                            />
                                                            <div className="text-sm">
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
                                                    <td className="hidden py-6 pr-8 text-sm sm:table-cell">
                                                        {orderItem.amount}
                                                    </td>
                                                    <td className="hidden py-6 pr-8 text-sm sm:table-cell">
                                                        ${orderItem.price}$
                                                    </td>
                                                    <td className="hidden py-6 pr-8 text-sm sm:table-cell">
                                                        ${orderItem.price * orderItem.amount}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td className="text-base font-medium text-gray-900">Order total</td>
                                            <td></td>
                                            <td></td>
                                            <td className="py-4 pr-8 text-base font-medium text-gray-900">
                                                $
                                                {currentOrderList.orderItem.reduce((prev, current) => {
                                                    return prev + current.amount * current.price;
                                                }, 0)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
