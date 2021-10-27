import * as React from 'react';

interface InformationFieldProps {
    label: string;
    isOnAdminForm?: boolean;
}

const InformationField: React.FunctionComponent<InformationFieldProps> = ({ label, children, isOnAdminForm }) => {
    return (
        <div className={`${!isOnAdminForm && 'py-4 sm:py-5 sm:px-6'} sm:grid sm:grid-cols-3 sm:gap-4`}>
            <dt className="flex items-center text-sm font-medium text-gray-500">
                <p>{label}</p>
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{children}</dd>
        </div>
    );
};

export default InformationField;
