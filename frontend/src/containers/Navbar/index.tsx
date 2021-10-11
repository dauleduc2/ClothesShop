/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import { navigationLink, userLink } from '../../consts/routes';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../redux';
import { UserState } from '../../common/interfaces/user';
import { userThunk } from '../../redux/user/userThunk';
import { useHistory } from 'react-router';
import Logo from '../../components/common/Logo';
import * as notificationHelper from '../../utils/notificationHelper';
import { CartState } from '../../common/interfaces/cart';
interface NavbarProps {}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const cartState = useSelector<RootState, CartState>((state) => state.cart);
    const history = useHistory();
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative flex justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    {open ? (
                                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                                <div className="flex items-center flex-shrink-0">
                                    <Logo />
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    {navigationLink.map((route, index) => {
                                        if (route.to === '/user/login') {
                                            return '';
                                        }

                                        return (
                                            <NavLink
                                                to={route.to}
                                                exact={route.exact}
                                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                                                activeClassName="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500"
                                                key={index}
                                            >
                                                {route.buttonName}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>

                            {userState.isLogin ? (
                                <div className="items-center justify-end flex-1 hidden lg:flex ">
                                    {/* Cart */}
                                    <Popover className="flow-root ml-4 text-sm lg:relative lg:ml-8">
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
                                        {/* <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Panel className="absolute top-16 inset-x-0 mt-px pb-6 bg-white shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                                                <h2 className="sr-only">Shopping Cart</h2>

                                                {cartState.productList.length === 0 ? (
                                                    <div className="flex flex-col">
                                                        <img
                                                            src="/images/empty-cart.png"
                                                            className="m-auto w-80"
                                                            alt="empty cart"
                                                        />
                                                        <h2 className="m-auto text-lg font-normal">
                                                            Your cart is empty
                                                        </h2>
                                                    </div>
                                                ) : (
                                                    <div className="max-w-2xl px-4 mx-auto">
                                                        <ul className="divide-y divide-gray-200">
                                                            {cartState.productList.map((product) => (
                                                                <li
                                                                    key={product.name}
                                                                    className="flex items-center py-6"
                                                                >
                                                                    <img
                                                                        src={`${process.env.REACT_APP_SERVER_URL}/${product.productAvatar}`}
                                                                        alt={product.name}
                                                                        className="flex-none w-16 h-16 border border-gray-200 rounded-md"
                                                                    />
                                                                    <div className="flex-col flex-auto ml-4">
                                                                        <h3 className="font-medium text-gray-900">
                                                                            <Link to={`/product/${product.name}`}>
                                                                                {product.name}
                                                                            </Link>
                                                                        </h3>
                                                                        <div className="flex">
                                                                            <p className="text-gray-500">
                                                                                {product.color.name}
                                                                            </p>
                                                                            <p className="pl-4 ml-4 text-gray-500 border-l border-gray-200">
                                                                                {product.size.name}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <p className="mt-6 text-center">
                                                            <Link
                                                                to="/user/cart"
                                                                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                                            >
                                                                View Shopping Bag
                                                            </Link>
                                                        </p>
                                                    </div>
                                                )}
                                            </Popover.Panel>
                                        </Transition> */}
                                    </Popover>
                                </div>
                            ) : (
                                ''
                            )}

                            {userState.isLogin ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-50 w-48 py-1 mt-2 text-left origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userLink.map((route, index) => {
                                                    if (route.to === '/user/logout') {
                                                        return (
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <div
                                                                        key={index}
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
                                                    return (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <NavLink
                                                                    to={route.to}
                                                                    key={index}
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
                            ) : (
                                <NavLink
                                    to="/user/login"
                                    exact={true}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
                                    activeClassName="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="pt-2 pb-4 space-y-1">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            {navigationLink.map((route, index) => {
                                return (
                                    <NavLink
                                        to={route.to}
                                        exact={route.exact}
                                        className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                                        activeClassName="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                        key={index}
                                    >
                                        {route.buttonName}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
