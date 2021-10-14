import { ShoppingBagIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
interface OrderPageProps {}

const people = [
    {
        name: '#001',
        date: '10/4/2021',
        totalProduct: 3,
        totalPrice: '99$',
        status: 'Shipping',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
    },
    {
        name: '#002',
        date: '10/4/2021',
        totalProduct: 3,
        totalPrice: '99$',
        status: 'Done',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
    },
    {
        name: '#003',
        date: '10/4/2021',
        totalProduct: 3,
        totalPrice: '99$',
        status: 'Cancel',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
    },
    // More people...
];
const OrderPage: React.FunctionComponent<OrderPageProps> = () => {
    return (
        <div className="p-2 lg:p-10">
            <h2 className="mb-4">Recent order</h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person) => (
                    <li
                        key={person.email}
                        className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow-lg"
                    >
                        <div className="flex items-center justify-between w-full p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">{person.name}</h3>
                                    {person.status.toLocaleLowerCase() === 'done' ? (
                                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                            {person.status}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                    {person.status.toLocaleLowerCase() === 'shipping' ? (
                                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-yellow-800 text-xs font-medium bg-yellow-100 rounded-full">
                                            {person.status}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                    {person.status.toLocaleLowerCase() === 'cancel' ? (
                                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full">
                                            {person.status}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-gray-500 truncate">Date : {person.date}</p>
                                <p className="mt-1 text-sm text-gray-500 truncate">
                                    Total product : {person.totalProduct}
                                </p>
                                <p className="mt-1 text-sm text-gray-500 truncate">Total price : {person.totalPrice}</p>
                            </div>
                            {person.status.toLowerCase() === 'done' ? (
                                <div className="p-1 bg-green-400 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                ''
                            )}
                            {person.status.toLowerCase() === 'shipping' ? (
                                <div className="p-1 bg-yellow-400 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                        ></path>
                                    </svg>
                                </div>
                            ) : (
                                ''
                            )}
                            {person.status.toLowerCase() === 'cancel' ? (
                                <div className="p-1 bg-red-400 rounded-full">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        <div>
                            <div className="flex -mt-px divide-x divide-gray-200">
                                <div className="flex flex-1 w-0">
                                    <Link
                                        to="#"
                                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <ShoppingBagIcon
                                            className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500 "
                                            aria-hidden="true"
                                        />
                                        <span className="ml-3">Detail</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderPage;
