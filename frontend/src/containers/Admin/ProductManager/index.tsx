import { useState } from 'react';
import React from 'react';
import { RootState, store } from '../../../redux';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { productThunk } from '../../../redux/product/productThunk';
import { ProductState } from '../../../common/interfaces/Redux/product';
import * as urlLink from '../../../consts/url';
import PaginationBar from '../../../components/common/PaginationBar';
import { capitalizeFirstLetter } from '../../../utils/textHelper';
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

    //set limit and page and call api to get product list by that
    React.useEffect(() => {
        setLimit(Number(params.limit));
        setPage(Number(params.page));
        store.dispatch(productThunk.adminGetAllProduct({ limit, page }));
    }, [params.limit, params.page, limit, page]);

    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col flex-1 min-w-max">
                    <div className="-my-2 sm:-mx-6 lg:-mx-8">
                        <div className="min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
                                        {productListState.admin.productList.map((product, index) => (
                                            <tr
                                                key={product.ID}
                                                className={
                                                    (index + productListState.admin.productList.length) % 2 === 0
                                                        ? 'bg-white w-full'
                                                        : 'bg-gray-100 w-full'
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="w-10 h-10 rounded-full"
                                                                src={`${urlLink.ENV_SERVER}/${product.productAvatar}`}
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
                                                    {product.status === 'AVAILABLE' && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-gray-800">
                                                            {capitalizeFirstLetter(product.status.toLowerCase())}
                                                        </span>
                                                    )}
                                                    {product.status === 'UNAVAILABLE' && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-gray-800">
                                                            {capitalizeFirstLetter(product.status.toLowerCase())}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {new Date(product.createDate).toDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <div className="text-indigo-600 hover:text-indigo-900">Edit</div>
                                                </td>
                                            </tr>
                                        ))}
                                        {[...Array(limit - productListState.admin.productList.length)].map(
                                            (value, index) => {
                                                return (
                                                    <tr
                                                        className={
                                                            (index + 1 + productListState.admin.productList.length) %
                                                                2 ===
                                                            0
                                                                ? 'bg-white w-full'
                                                                : 'bg-gray-100 w-full'
                                                        }
                                                        key={index}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center invisible">
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img className="w-10 h-10 rounded-full" alt="" />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        a
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">a</div>
                                                                    <div className="text-sm text-gray-500">a</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td></td>
                                                        <td></td>
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
                    </div>
                    {/* pagination bar */}
                    <PaginationBar
                        limit={limit}
                        page={page}
                        numberOfItem={productListState.admin.count}
                        routeUrl={urlLink.ADMIN_PRODUCT}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductManagerPage;
