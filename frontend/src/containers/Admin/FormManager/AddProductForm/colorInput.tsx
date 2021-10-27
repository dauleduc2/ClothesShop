import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { Color } from '../../../../common/interfaces/Model/Color';
import { ColorState } from '../../../../common/interfaces/Redux/color';

interface ColorInputProps {
    colorState: ColorState;
    selectedColor: Color;
    setSelectedColor: React.Dispatch<React.SetStateAction<Color>>;
    selectedColorList: Color[];
    setSelectedColorList: React.Dispatch<React.SetStateAction<Color[]>>;
}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const ColorInput: React.FunctionComponent<ColorInputProps> = ({
    colorState,
    selectedColor,
    setSelectedColor,
    selectedColorList,
    setSelectedColorList,
}) => {
    return (
        <div className="relative flex flex-col items-start mt-1">
            {colorState.data.length !== 0 && (
                <Listbox
                    value={selectedColor}
                    onChange={(data) => {
                        //merge two array to make sure each color have only one
                        const newSelectedColorList = [...selectedColorList].concat(
                            [data].filter((dataColor) =>
                                [...selectedColorList].every((color) => color.ID !== dataColor.ID)
                            )
                        );

                        setSelectedColor(data);
                        setSelectedColorList(newSelectedColorList);
                    }}
                >
                    <div className="relative mt-1">
                        <Listbox.Button className="relative py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default w-max focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <div className="flex items-center">
                                <span
                                    className={'flex-shrink-0 inline-block h-2 w-2 rounded-full'}
                                    style={{
                                        backgroundColor: selectedColor.hexCode,
                                    }}
                                />
                                <span className="block ml-3 truncate">{selectedColor.name}</span>
                            </div>
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
                                {colorState.data.map((color) => (
                                    <Listbox.Option
                                        key={color.ID}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={color}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={'flex-shrink-0 inline-block h-2 w-2 rounded-full'}
                                                        style={{
                                                            backgroundColor: color.hexCode,
                                                        }}
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={classNames(
                                                            selected ? 'font-semibold' : 'font-normal',
                                                            'ml-3 block truncate'
                                                        )}
                                                    >
                                                        {color.name}
                                                    </span>
                                                </div>
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
                {selectedColorList.length !== 0 &&
                    selectedColorList.map((color) => (
                        <span
                            key={color.ID}
                            className={`inline-flex mr-3 w-max rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium  ${
                                color.hexCode === '#000000' ? 'text-gray-200' : 'text-gray-800'
                            } `}
                            style={{ backgroundColor: color.hexCode }}
                        >
                            {color.name}
                            <button
                                type="button"
                                className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                                onClick={() => {
                                    const newSelectedColorList = [...selectedColorList].filter(
                                        (filColor) => filColor.ID !== color.ID
                                    );
                                    setSelectedColorList(newSelectedColorList);
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

export default ColorInput;
