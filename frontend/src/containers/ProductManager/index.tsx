import { useState } from 'react';
import React from 'react';
import { RootState, store } from '../../redux';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { productThunk } from '../../redux/product/productThunk';
import { ProductState } from '../../common/interfaces/product';
interface ProductManagerPageProps extends RouteComponentProps {}

interface QueryProps {
    limit: string;
    page: string;
}

const ProductManagerPage: React.FunctionComponent<ProductManagerPageProps> = ({ location }) => {
    let params: QueryProps = queryString.parse(location.search) as any;
    const productListState = useSelector<RootState, ProductState>((state) => state.product);

    const [limit, setLimit] = useState<number>(Number(params.limit));
    const [page, setPage] = useState<number>(Number(params.page));

    //variable for pagination
    let isTruncate = false; //this variable for checking is render truncated box or not
    const numLinksTwoSide = 1;
    const totalPage = Math.ceil(productListState.admin.count / limit);
    const minRange = numLinksTwoSide + 4;
    const numberOfTruncLeft = page - numLinksTwoSide;
    const numberOfTruncRight = page + numLinksTwoSide;

    //set limit and page and call api to get product list by that
    React.useEffect(() => {
        setLimit(Number(params.limit));
        setPage(Number(params.page));
        store.dispatch(productThunk.adminGetAllProduct({ limit, page }));
    }, [params.limit, params.page, limit, page]);

    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
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
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                                Create Date
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {productListState.admin.productList.map((product) => (
                                            <tr key={product.ID}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="w-10 h-10 rounded-full"
                                                                src={`${process.env.REACT_APP_SERVER_URL}/${product.productAvatar}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {product.colors.map((color) => color.name).join(' | ')}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {product.sizes.map((size) => size.name).join(' | ')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{product.quantity}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    ${product.price}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {product.status}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {new Date(product.createDate).toDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <button className="text-indigo-600 hover:text-indigo-900">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
                                    <span className="font-medium">{productListState.admin.count}</span> orders
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
                                    {[...Array(totalPage)].map((value, index) => {
                                        const pos = index + 1;
                                        //truncate left
                                        if (pos < totalPage - minRange + 1) {
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
                                            numberOfTruncRight < totalPage - 3 + 1 &&
                                            pos !== totalPage &&
                                            pos > numberOfTruncRight
                                        ) {
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
                                            page === totalPage
                                                ? `/admin/order?limit=${limit}&page=${totalPage}`
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
            </div>
        </>
    );
};

export default ProductManagerPage;
