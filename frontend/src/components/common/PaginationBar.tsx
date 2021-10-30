import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

interface PaginationBarProps {
    page: number;
    limit: number;
    numberOfItem: number;
    routeUrl: string;
}

const PaginationBar: React.FunctionComponent<PaginationBarProps> = ({ page, limit, numberOfItem, routeUrl }) => {
    //variable for pagination
    let isTruncate = false; //this variable for checking is render truncated box or not
    const numLinksTwoSide = 1;
    const totalPage = Math.ceil(numberOfItem / limit);
    const minRange = numLinksTwoSide + 4;
    const numberOfTruncLeft = page - numLinksTwoSide;
    const numberOfTruncRight = page + numLinksTwoSide;
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex justify-between flex-1 sm:hidden">
                <Link
                    to={`${routeUrl}?limit=${limit}&page=${page - 1}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Previous
                </Link>
                <Link
                    to={`${routeUrl}?limit=${limit}&page=${Number(page) + 1}`}
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
                        <span className="font-medium">{numberOfItem}</span> orders
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            to={
                                page - 1 === 0
                                    ? `${routeUrl}?limit=${limit}&page=${1}`
                                    : `${routeUrl}?limit=${limit}&page=${page - 1}`
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
                                            <span
                                                key={index}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"
                                            >
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
                                    key={index}
                                    to={`${routeUrl}?limit=${limit}&page=${index + 1}`}
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
                                Number(page) === Number(totalPage)
                                    ? `${routeUrl}?limit=${limit}&page=${totalPage}`
                                    : `${routeUrl}?limit=${limit}&page=${Number(page) + 1}`
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
    );
};

export default PaginationBar;
