import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { Size } from '../../../../common/interfaces/Model/Size';
import { SizeState } from '../../../../common/interfaces/Redux/size';
import React from 'react';
interface SizeInputProps {
    sizeState: SizeState;
    selectedSize: Size;
    setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
    selectedSizeList: Size[];
    setSelectedSizeList: React.Dispatch<React.SetStateAction<Size[]>>;
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const SizeInput: React.FunctionComponent<SizeInputProps> = ({
    sizeState,
    selectedSize,
    setSelectedSize,
    selectedSizeList,
    setSelectedSizeList,
}) => {
    return (
        <div className="mt-1 sm:mt-0 sm:col-span-2">
            {sizeState.data.length !== 0 && (
                <Listbox
                    value={selectedSize}
                    onChange={(selectedSize) => {
                        //merge two array to make sure each size have only one
                        const newSelectedSizeList = [...selectedSizeList].concat(
                            [selectedSize].filter((dataSize) =>
                                [...selectedSizeList].every((size) => size.ID !== dataSize.ID)
                            )
                        );

                        setSelectedSize(selectedSize);
                        setSelectedSizeList(newSelectedSizeList);
                    }}
                >
                    <div className="relative mt-1">
                        <Listbox.Button className="relative py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default w-max focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">{selectedSize.name.toUpperCase()}</span>
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
                            <Listbox.Options className="absolute z-10 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg w-max max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {sizeState.data.map((size) => (
                                    <Listbox.Option
                                        key={size.ID}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={size}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected ? 'font-semibold' : 'font-normal',
                                                        'block truncate'
                                                    )}
                                                >
                                                    {size.name.toUpperCase()}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            )}
            <div className="flex mt-5">
                {selectedSizeList.length !== 0 &&
                    selectedSizeList.map((size) => (
                        <span
                            key={size.ID}
                            className="inline-flex mr-3 rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
                        >
                            {size.name.toUpperCase()}
                            <button
                                type="button"
                                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                                onClick={() => {
                                    const newSelectedSizeList = [...selectedSizeList].filter(
                                        (filSize) => filSize.ID !== size.ID
                                    );
                                    setSelectedSizeList(newSelectedSizeList);
                                }}
                            >
                                <span className="sr-only">Remove large option</span>
                                <svg className="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default SizeInput;
