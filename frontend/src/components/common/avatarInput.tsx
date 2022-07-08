import { FilePreview } from '../../containers/Admin/FormManager/AddProductForm';
import AddImageIcon from './icon/AddImage';
import XTagIcon from './icon/XTag';
import * as urlLink from '../../consts/url';
interface AvatarInputProps {
    avatar: FilePreview | undefined;
    setAvatar: React.Dispatch<React.SetStateAction<FilePreview | undefined>>;
    handleAvatarPreview: any;
    initAvatar?: string;
    setInitAvatar?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AvatarInput: React.FunctionComponent<AvatarInputProps> = ({
    avatar,
    initAvatar,
    setAvatar,
    handleAvatarPreview,
    setInitAvatar,
}) => {
    return (
        <div className="mt-1 sm:mt-0 sm:col-span-2">
            {avatar?.preview ? (
                <div className="relative">
                    <img className=" w-28" src={avatar.preview} alt={avatar.name} />
                    <div
                        className="absolute z-20 text-white cursor-pointer -top-4 left-24"
                        onClick={(e) => {
                            URL.revokeObjectURL(avatar.preview);
                            setAvatar({ ...avatar, preview: '' });
                        }}
                    >
                        <XTagIcon />
                    </div>
                </div>
            ) : (
                initAvatar && (
                    <div className="relative">
                        <img className=" w-28" src={`${urlLink.ENV_SERVER}/${initAvatar}`} alt={initAvatar} />
                        <div
                            className="absolute z-20 text-white cursor-pointer -top-4 left-24"
                            onClick={(e) => {
                                if (typeof setInitAvatar !== 'undefined') {
                                    setInitAvatar('');
                                }
                            }}
                        >
                            <XTagIcon />
                        </div>
                    </div>
                )
            )}
            {!avatar?.preview && !initAvatar && (
                <div className="relative flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="relative space-y-1 text-center ">
                        <AddImageIcon />
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="productAvatar"
                                className="font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input
                                    id="productAvatar"
                                    name="productAvatar"
                                    type="file"
                                    onChange={(e) => handleAvatarPreview(e)}
                                    className="sr-only"
                                />
                            </label>
                        </div>

                        <p className="text-xs text-gray-500">PNG, JPG, JEPG</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarInput;
