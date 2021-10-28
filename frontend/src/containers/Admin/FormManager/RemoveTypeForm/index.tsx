import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { Type } from '../../../../common/interfaces/Model/Type';
import { capitalizeFirstLetter } from '../../../../utils/textHelper';
import * as React from 'react';
import { RootState, store } from '../../../../redux';
import { useSelector } from 'react-redux';
import { TypeState } from '../../../../common/interfaces/Redux/type';
import * as notificationHelper from '../../../../utils/notificationHelper';
import { typeThunk } from '../../../../redux/type/typeThunk';
interface RemoveTypeFormProps {}
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}
const RemoveTypeForm: React.FunctionComponent<RemoveTypeFormProps> = () => {
    const typeState = useSelector<RootState, TypeState>((state) => state.type);
    const [selectedType, setSelectedType] = React.useState<Type>(typeState.data[0]);
    const onSubmit = async (e: any) => {
        e.preventDefault();
        const result = await store.dispatch(typeThunk.adminRemoveType(selectedType.ID));
        if (result.meta.requestStatus === 'fulfilled') {
            notificationHelper.success('Remove type success!');
        }
    };
    return (
        <div className="w-full h-full p-5 space-y-8 divide-y divide-gray-200 bg-gray-50 intro-y">
            <div className="m-auto bg-white shadow w-max sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add new color</h3>
                    <div className="max-w-xl mt-2 text-sm text-gray-500">
                        <p>Full fill the form to remove a color from your store,</p>
                    </div>
                    <form onSubmit={onSubmit} className="w-full mt-5 sm:flex sm:flex-col sm:items-start">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Name
                            </label>
                        </div>
                        {typeState.data.length !== 0 && (
                            <Listbox value={selectedType} onChange={setSelectedType}>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-64 py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <span className="block truncate">
                                            {capitalizeFirstLetter(selectedType.name.toLowerCase())}
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
                        <button
                            type="submit"
                            className="inline-flex items-center self-end justify-center w-full px-4 py-2 mt-5 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-5 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Remove
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RemoveTypeForm;
