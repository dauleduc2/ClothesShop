import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { TypeState } from '../../common/interfaces/Redux/type';
import * as React from 'react';
import { capitalizeFirstLetter } from '../../utils/textHelper';
import { Type } from '../../common/interfaces/Model/Type';
interface TypeInputProps {
    typeState: TypeState;
    selectedType: Type;
    setSelectedType: React.Dispatch<React.SetStateAction<Type>>;
    selectedTypeList: Type[];
    setSelectedTypeList: React.Dispatch<React.SetStateAction<Type[]>>;
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const TypeInput: React.FunctionComponent<TypeInputProps> = ({
    typeState,
    selectedType,
    setSelectedType,
    selectedTypeList,
    setSelectedTypeList,
}) => {
    return (
        <div className="mt-1 sm:mt-0 sm:col-span-2">
            {typeState.data.length !== 0 && (
                <Listbox
                    value={selectedType}
                    onChange={(selectedType) => {
                        //merge two array to make sure each size have only one
                        const newSelectedTypeList = [...selectedTypeList].concat(
                            [selectedType].filter((dataType) =>
                                [...selectedTypeList].every((Type) => Type.ID !== dataType.ID)
                            )
                        );

                        setSelectedType(selectedType);
                        setSelectedTypeList(newSelectedTypeList);
                    }}
                >
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-64 py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <span className="block truncate">
                                {selectedType ? capitalizeFirstLetter(selectedType?.name.toLowerCase()) : ''}
                            </span>
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
                            <Listbox.Options className="absolute z-10 w-64 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {typeState.data.map((type) => (
                                    <Listbox.Option
                                        key={type.ID}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={type}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected ? 'font-semibold' : 'font-normal',
                                                        'block truncate'
                                                    )}
                                                >
                                                    {capitalizeFirstLetter(type.name.toLowerCase())}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
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
            )}
            <div className="flex mt-5">
                {selectedTypeList.length !== 0 &&
                    selectedTypeList.map((type) => (
                        <span
                            key={type.ID}
                            className="inline-flex mr-3 rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
                        >
                            {capitalizeFirstLetter(type.name.toLowerCase())}
                            <button
                                type="button"
                                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                                onClick={() => {
                                    const newSelectedTypeList = [...selectedTypeList].filter(
                                        (filType) => filType.ID !== type.ID
                                    );
                                    setSelectedTypeList(newSelectedTypeList);
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

export default TypeInput;
