import { Listbox, Transition } from '@headlessui/react';
import { ProductStatus, ProductStatusString } from '../../common/interfaces/Model/Product';
import React from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { capitalizeFirstLetter } from '../../utils/textHelper';
interface StatusInputProps {
    selectedStatus: ProductStatusString;
    setSelectedStatus: React.Dispatch<React.SetStateAction<ProductStatusString>>;
}
const statusList = [ProductStatus.AVAILABLE, ProductStatus.UNAVAILABLE];
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const StatusInput: React.FunctionComponent<StatusInputProps> = ({ selectedStatus, setSelectedStatus }) => {
    return (
        <Listbox value={selectedStatus} onChange={setSelectedStatus}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{capitalizeFirstLetter(selectedStatus.toLocaleLowerCase())}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>

                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {statusList.map((status) => (
                            <Listbox.Option
                                key={status}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                    )
                                }
                                value={status}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                selected ? 'font-semibold' : 'font-normal',
                                                'block truncate'
                                            )}
                                        >
                                            {capitalizeFirstLetter(status.toLocaleLowerCase())}
                                        </span>

                                        {selected ? (
                                            <span
                                                className={classNames(
                                                    active ? 'text-white' : 'text-indigo-600',
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                )}
                                            >
                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default StatusInput;
