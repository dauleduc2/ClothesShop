import * as React from "react";

interface InputFieldProps {
    label: string;
    field: string;
    register?: any;
    type?: string;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
    label,
    field,
    register,
    type = "text",
}) => {
    return (
        <div className="flex flex-col space-y-2 items-start">
            <label className="text-gray-100 select-none font-medium text-2xl">
                {label}
            </label>
            <input
                {...register(field)}
                id={field}
                type={type}
                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 text-2xl w-full"
            />
        </div>
    );
};

export default InputField;
