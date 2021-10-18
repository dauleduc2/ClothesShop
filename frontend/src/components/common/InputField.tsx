import * as React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { capitalizeFirstLetter } from '../../utils/textHelper';
interface InputFieldProps {
    label?: string;
    field: string;
    message: string;
    register?: any;
    type?: string;
    defaultValue?: string;
    placeholder?: string;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
    label,
    field,
    message,
    type = 'text',
    register = () => {},
    defaultValue,
    placeholder,
}) => {
    return (
        <div>
            <label htmlFor={field} className="block text-sm font-medium text-left text-gray-700">
                {label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type={type}
                    name={field}
                    id={field}
                    className={
                        message
                            ? 'block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                            : 'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                    }
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    aria-invalid="true"
                    aria-describedby="email-error"
                    {...register(field)}
                />
                {message && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                    </div>
                )}
            </div>
            {message && (
                <p className="mt-2 text-sm text-left text-red-600" id="email-error">
                    {capitalizeFirstLetter(message)}
                </p>
            )}
        </div>
    );
};

export default InputField;
