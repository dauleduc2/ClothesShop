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
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { analystThunk } from '../../../redux/analyst/analystThunk';
import { AnalystState } from '../../../common/interfaces/Redux/analyst';
import { Link } from 'react-router-dom';
interface ProductManagerPageProps extends RouteComponentProps {}

interface QueryProps {
    limit: string;
    page: string;
}

const ProductManagerPage: React.FunctionComponent<ProductManagerPageProps> = ({ location }) => {
    let params: QueryProps = queryString.parse(location.search) as any;
    const productListState = useSelector<RootState, ProductState>((state) => state.product);
    const analystState = useSelector<RootState, AnalystState>((state) => state.analyst);
    const [limit, setLimit] = useState<number>(Number(params.limit));
    const [page, setPage] = useState<number>(Number(params.page));
    const [dataSeries, setDataSeries] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const options: ApexOptions = {
        chart: {
            id: 'basic-bar',
        },
        xaxis: {
            categories: categories,
        },
    };
    const series = [
        {
            name: 'total item sale',
            data: dataSeries,
        },
    ];
    //set limit and page and call api to get product list by that
    React.useEffect(() => {
        setLimit(Number(params.limit));
        setPage(Number(params.page));
        store.dispatch(productThunk.adminGetAllProduct({ limit, page }));
    }, [params.limit, params.page, limit, page]);
    //set data of graph
    React.useLayoutEffect(() => {
        if (analystState.eachProductAnalyst.length > 0) {
            setCategories(analystState.eachProductAnalyst.map((item) => item.time));
            setDataSeries(analystState.eachProductAnalyst.map((item) => parseInt(item.data)));
        }
        return () => {};
    }, [analystState.eachProductAnalyst]);

    const onShowProduct = (ID: string) => {
        const currentYear = new Date().getFullYear();
        store.dispatch(
            analystThunk.adminGetEachProductAnalyst({
                from: `${currentYear}-01-01`,
                to: `${currentYear}-12-31`,
                ID: ID,
            })
        );
    };
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col flex-1 min-w-max intro-y">
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
                                                <td className="flex px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <div
                                                        className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                                                        onClick={() => {
                                                            onShowProduct(product.ID);
                                                        }}
                                                    >
                                                        Show
                                                    </div>
                                                    <Link
                                                        to={`${urlLink.ADMIN_PRODUCT}/${product.name}`}
                                                        className="ml-5 text-red-600 cursor-pointer hover:text-red-900"
                                                        onClick={() => {
                                                            onShowProduct(product.ID);
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
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
                <div className="ml-10 intro-y">
                    <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Total sale on this year
                    </h2>

                    <Chart options={options} series={series} type="line" width="500" />
                </div>
            </div>
        </>
    );
};

export default ProductManagerPage;
