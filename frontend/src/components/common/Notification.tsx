import React from 'react';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import WarningIcon from './icon/WarningIcon';
import ErrorIcon from './ErrorIcon';
import { notificationStatus } from '../../common/interfaces/Redux/UI';

// import WarningIcon from '../../assets/icon/WarningIcon';
interface NotificationProps {
    status: string;
    isOpenning: boolean;
    title: string;
    message: string;
    onCloseNotification: Function;
}

const Notification: React.FunctionComponent<NotificationProps> = ({
    status,
    isOpenning,
    title,
    message,
    onCloseNotification,
}) => {
    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                className="fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            >
                <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={isOpenning}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {status === notificationStatus.SUCCESS && (
                                            <CheckCircleIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                                        )}

                                        {status === notificationStatus.WARNING && <WarningIcon />}
                                        {status === notificationStatus.ERROR && <ErrorIcon />}
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">{title}</p>
                                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                                    </div>
                                    <div className="flex flex-shrink-0 ml-4">
                                        <button
                                            className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                onCloseNotification();
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="w-5 h-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
};

export default Notification;
