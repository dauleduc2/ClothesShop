import { useState } from 'react';
import React from 'react';
import { RootState, store } from '../../../redux';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { userThunk } from '../../../redux/user/userThunk';
import { UserState } from '../../../common/interfaces/Redux/user';
import * as urlLink from '../../../consts/url';
interface UserManagerProps extends RouteComponentProps {}

interface QueryProps {
    limit: string;
    page: string;
}

const UserManagerPage: React.FunctionComponent<UserManagerProps> = ({ location }) => {
    let params: QueryProps = queryString.parse(location.search) as any;
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const [limit, setLimit] = useState<number>(Number(params.limit));
    const [page, setPage] = useState<number>(Number(params.page));

    //variable for pagination
    let isTruncate = false; //this variable for checking is render truncated box or not
    const numLinksTwoSide = 1;
    const totalPage = Math.ceil(userState.admin.count / limit);
    const minRange = numLinksTwoSide + 4;
    const numberOfTruncLeft = page - numLinksTwoSide;
    const numberOfTruncRight = page + numLinksTwoSide;

    //set limit and page and call api to get order list by that
    React.useEffect(() => {
        setLimit(Number(params.limit));
        setPage(Number(params.page));
        store.dispatch(userThunk.getAllUser({ limit, page }));
    }, [params.limit, params.page, limit, page]);
    return (
        <>
            <div className="flex w-full">
                <div className="w-full -my-2 overflow-x-auto text-left sm:-mx-6 lg:-mx-8 intro-y">
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
                                            Username
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Full Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Phone Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Join Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userState.admin.userList.map((user, index) => (
                                        <tr key={user.ID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                #{user.ID.substring(0, 8)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {user.username}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {user.fullName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {user.address}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {user.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {new Date(user.createDate).toDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {user.role === 1 ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-gray-800">
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                                                        User
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {[...Array(limit - userState.admin.userList.length)].map((value, index) => {
                                        return (
                                            <tr
                                                className={
                                                    (index + userState.admin.userList.length) % 2 === 0
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
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between flex-1 sm:hidden">
                            <Link
                                to={`${urlLink.ADMIN_USER}?limit=${limit}&page=${page - 1}`}
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                            <Link
                                to={`${urlLink.ADMIN_USER}?limit=${limit}&page=${page + 1}`}
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
                                    <span className="font-medium">{userState.admin.count}</span> orders
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
                                                ? `${urlLink.ADMIN_USER}?limit=${limit}&page=${1}`
                                                : `${urlLink.ADMIN_USER}?limit=${limit}&page=${page - 1}`
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
                                                to={`${urlLink.ADMIN_USER}?limit=${limit}&page=${index + 1}`}
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
                                                ? `${urlLink.ADMIN_USER}?limit=${limit}&page=${totalPage}`
                                                : `${urlLink.ADMIN_USER}?limit=${limit}&page=${page + 1}`
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

export default UserManagerPage;
