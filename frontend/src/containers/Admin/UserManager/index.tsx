import { useState } from 'react';
import React from 'react';
import { RootState, store } from '../../../redux';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { userThunk } from '../../../redux/user/userThunk';
import { UserState } from '../../../common/interfaces/Redux/user';
import * as urlLink from '../../../consts/url';
import PaginationBar from '../../../components/common/PaginationBar';
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

    //set limit and page and call api to get order list by that
    React.useEffect(() => {
        setLimit(Number(params.limit));
        setPage(Number(params.page));
        store.dispatch(userThunk.getAllUser({ limit, page }));
    }, [params.limit, params.page, limit, page]);
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col flex-1 w-full -my-2 overflow-x-auto text-left sm:-mx-6 lg:-mx-8 intro-y">
                    <div className="min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
                                                {user.role === 'ADMIN' ? (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-gray-800">
                                                        Admin
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-gray-800">
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
                    <PaginationBar
                        page={page}
                        limit={limit}
                        numberOfItem={userState.admin.count}
                        routeUrl={urlLink.ADMIN_USER}
                    />
                </div>
            </div>
        </>
    );
};

export default UserManagerPage;
