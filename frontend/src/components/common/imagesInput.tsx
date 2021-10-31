import { Image } from '../../common/interfaces/Model/Image';
import { FilePreview } from '../../containers/Admin/FormManager/AddProductForm';
import AddImageIcon from './icon/AddImage';
import XTagIcon from './icon/XTag';
import * as urlLink from '../../consts/url';
interface ImagesInputProps {
    handleImagePreview: any;
    images: FilePreview[] | undefined;
    setImages: React.Dispatch<React.SetStateAction<FilePreview[] | undefined>>;
    initImages?: Image[] | undefined;
    setInitImages?: React.Dispatch<React.SetStateAction<Image[] | undefined>>;
}

const ImagesInput: React.FunctionComponent<ImagesInputProps> = ({
    handleImagePreview,
    images,
    setImages,
    initImages,
    setInitImages,
}) => {
    return (
        <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="relative flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="relative space-y-1 text-center ">
                    <AddImageIcon />
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor="images"
                            className="font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                            <span>Upload files</span>
                            <input
                                id="images"
                                multiple={true}
                                name="images"
                                type="file"
                                className="sr-only"
                                onChange={(e) => handleImagePreview(e)}
                            />
                        </label>
                    </div>

                    <p className="text-xs text-gray-500">PNG, JPG, JEPG</p>
                </div>
            </div>
            <div className="flex flex-row mt-5">
                {initImages &&
                    initImages.length > 0 &&
                    initImages?.map((image) => (
                        <div key={image.ID} className="relative mr-5">
                            <img className=" w-28" src={`${urlLink.ENV_SERVER}/${image.imageLink}`} alt={image.ID} />
                            <div
                                className="absolute z-20 text-white cursor-pointer -top-4 left-24"
                                onClick={(e) => {
                                    if (typeof setInitImages !== 'undefined') {
                                        setInitImages(
                                            [...initImages].filter((filImage, index) => {
                                                return filImage.ID !== image.ID;
                                            })
                                        );
                                    }
                                }}
                            >
                                <XTagIcon />
                            </div>
                        </div>
                    ))}

                {images &&
                    images.length > 0 &&
                    images?.map((image) => (
                        <div key={image.name} className="relative mr-5">
                            <img className=" w-28" src={image.preview} alt={image.name} />
                            <div
                                className="absolute z-20 text-white cursor-pointer -top-4 left-24"
                                onClick={(e) => {
                                    setImages(
                                        [...images].filter((filImage, index) => {
                                            if (filImage.preview === image.preview) {
                                                URL.revokeObjectURL(images[index].preview);
                                            }
                                            return filImage.preview !== image.preview;
                                        })
                                    );
                                }}
                            >
                                <XTagIcon />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ImagesInput;
