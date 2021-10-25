/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import { adminUserLink, navigationLink, userLink, userMobileLink } from '../../consts/routes';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux';
import { userThunk } from '../../redux/user/userThunk';
import { useHistory } from 'react-router';
import Logo from '../../components/common/icon/Logo';
import * as notificationHelper from '../../utils/notificationHelper';
import { SearchIcon } from '@heroicons/react/solid';
import { UserState } from '../../common/interfaces/Redux/user';
import { CartState } from '../../common/interfaces/Redux/cart';
interface NavbarProps {}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const cartState = useSelector<RootState, CartState>((state) => state.cart);
    const history = useHistory();
    return (
        <Disclosure as="nav" className="fixed top-0 z-30 w-full h-16 bg-gray-800">
            {({ open }) => (
                <>
                    <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex items-center px-2 lg:px-0">
                                <div className="flex-shrink-0">
                                    <Logo />
                                </div>
                                <div className="hidden lg:block lg:ml-6">
                                    <div className="flex space-x-4">
                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}

                                        {navigationLink.map((route, index) => {
                                            return (
                                                <NavLink
                                                    to={route.to}
                                                    exact={route.exact}
                                                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                                                    activeClassName="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md"
                                                    key={route.to}
                                                >
                                                    {route.buttonName}
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 bg-gray-700 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    {open ? (
                                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            {userState.isLogin ? (
                                <div className="hidden lg:flex lg:ml-4">
                                    <div className="items-center justify-end flex-1 hidden mr-4 lg:flex ">
                                        {/* Cart */}
                                        <Popover className="flow-root text-sm lg:relative lg:ml-8">
                                            <Popover.Button className="flex items-center p-2 -m-2 ">
                                                <Link to="/user/cart" className="relative w-6 h-6 ">
                                                    <ShoppingBagIcon
                                                        className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500 "
                                                        aria-hidden="true"
                                                    />
                                                    {cartState.productList.length !== 0 ? (
                                                        <span className="absolute w-4 h-4 ml-2 text-xs font-medium text-white bg-red-500 rounded-full bottom-4 group-hover:text-gray-800">
                                                            {cartState.productList.length}
                                                        </span>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Link>
                                            </Popover.Button>
                                        </Popover>
                                    </div>
                                    <div className="flex items-center">
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative flex-shrink-0 ml-4">
                                            <div>
                                                <Menu.Button className="flex text-sm text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={
                                                            userState.user.avatar
                                                                ? `${process.env.REACT_APP_SERVER_URL}/${userState.user.avatar}`
                                                                : '../images/avatar.png'
                                                        }
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userState.user.role === 1 &&
                                                        adminUserLink.map((route) => {
                                                            return (
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <NavLink
                                                                            to={route.to}
                                                                            key={route.to}
                                                                            exact={route.exact}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {route.buttonName}
                                                                        </NavLink>
                                                                    )}
                                                                </Menu.Item>
                                                            );
                                                        })}
                                                    {userLink.map((route, index) => {
                                                        if (route.to === '/user/logout') {
                                                            return (
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <div
                                                                            key={route.to}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                            onClick={() => {
                                                                                store.dispatch(userThunk.logout());
                                                                                notificationHelper.success(
                                                                                    'logout success'
                                                                                );
                                                                                history.push('/');
                                                                            }}
                                                                        >
                                                                            {route.buttonName}
                                                                        </div>
                                                                    )}
                                                                </Menu.Item>
                                                            );
                                                        }
                                                        if (userState.user.role === 0 && route.to === '/admin') {
                                                            return <></>;
                                                        }
                                                        return (
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <NavLink
                                                                        to={route.to}
                                                                        key={route.to}
                                                                        exact={route.exact}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {route.buttonName}
                                                                    </NavLink>
                                                                )}
                                                            </Menu.Item>
                                                        );
                                                    })}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            ) : (
                                <NavLink
                                    to="/user/login"
                                    exact={true}
                                    className="hidden px-3 py-2 text-base font-medium text-gray-300 rounded-md lg:block hover:bg-gray-700 hover:text-white"
                                    activeClassName="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>

                    <Disclosure.Panel className="bg-gray-800 lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            {navigationLink.map((route, index) => {
                                return (
                                    <NavLink
                                        to={route.to}
                                        exact={route.exact}
                                        className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                                        activeClassName="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                                        key={route.to}
                                    >
                                        {route.buttonName}
                                    </NavLink>
                                );
                            })}
                        </div>
                        {userState.isLogin ? (
                            <div className="pt-4 pb-3 border-t border-gray-700">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src={
                                                userState.user.avatar
                                                    ? `${process.env.REACT_APP_SERVER_URL}/${userState.user.avatar}`
                                                    : '../images/avatar.png'
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">
                                            {userState.user.username}
                                        </div>
                                        <div className="text-sm font-medium text-gray-400">{userState.user.email}</div>
                                    </div>
                                </div>
                                <div className="z-50 px-2 mt-3 space-y-1">
                                    {userMobileLink.map((route, index) => {
                                        if (route.to === '/user/logout') {
                                            return (
                                                <div
                                                    key={route.to}
                                                    className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md "
                                                    onClick={() => {
                                                        store.dispatch(userThunk.logout());
                                                        notificationHelper.success('logout success');
                                                        history.push('/');
                                                    }}
                                                >
                                                    {route.buttonName}
                                                </div>
                                            );
                                        }
                                        return (
                                            <NavLink
                                                to={route.to}
                                                key={route.to}
                                                exact={route.exact}
                                                className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                                            >
                                                {route.buttonName}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="pt-2 pb-2 border-t border-gray-700">
                                <div className="px-2 space-y-1">
                                    <NavLink
                                        to="/user/login"
                                        exact={true}
                                        className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                                        activeClassName="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                                    >
                                        Login
                                    </NavLink>
                                </div>
                            </div>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
