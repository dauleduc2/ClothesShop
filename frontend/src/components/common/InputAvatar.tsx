import * as React from 'react';

interface InputAvatarProps {
    setFile: Function;
    avatarUrl: string;
    label?: string;
    field: string;
    buttonName: string;
}

const InputAvatar: React.FunctionComponent<InputAvatarProps> = ({ avatarUrl, label, buttonName, field, setFile }) => {
    const [avatar, setAvatar] = React.useState(avatarUrl);

    const onChange = React.useCallback(
        (event) => {
            if (event.currentTarget.files) {
                setFile(event.currentTarget.files[0]);
                setAvatar(URL.createObjectURL(event.currentTarget.files[0]));
            }
        },
        [setFile]
    );
    //set avatar value on first render
    React.useEffect(() => {
        setAvatar(avatarUrl);
    }, [avatarUrl]);
    //remove previous avatar url when unmount, for performance
    React.useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);
    return (
        <div>
            {label && <label className="block text-sm font-medium text-left text-gray-700">{label}</label>}
            <div className="flex items-center mt-1 space-x-5">
                <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                    <img className="inline-block rounded-full" src={avatar} alt={field} />
                </span>
                <label
                    htmlFor="avatar"
                    className="px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {buttonName}
                </label>
                <input
                    type="file"
                    className="hidden"
                    id={field}
                    onChange={(event) => {
                        onChange(event);
                    }}
                />
            </div>
        </div>
    );
};

export default InputAvatar;
