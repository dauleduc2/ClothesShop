import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ProductAddFormDTO } from '../../../../common/interfaces/DTO/productDTO';
import { Color } from '../../../../common/interfaces/Model/Color';
import { Size } from '../../../../common/interfaces/Model/Size';
import { Type } from '../../../../common/interfaces/Model/Type';
import { ColorState } from '../../../../common/interfaces/Redux/color';
import { SizeState } from '../../../../common/interfaces/Redux/size';
import { TypeState } from '../../../../common/interfaces/Redux/type';
import InputField from '../../../../components/common/InputField';
import { RootState, store } from '../../../../redux';
import AvatarInput from './avatarInput';
import ColorInput from './colorInput';
import ImagesInput from './imagesInput';
import SizeInput from './SizeInput';
import TypeInput from './TypeInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { productThunk } from '../../../../redux/product/productThunk';
import * as notificationHelper from '../../../../utils/notificationHelper';
import { ProductStatus } from '../../../../common/interfaces/Model/Product';
import StatusInput from './statusInput';
interface AddProductFormProps {}

export interface FilePreview extends File {
    preview: string;
}

const AddProductForm: React.FunctionComponent<AddProductFormProps> = () => {
    const sizeState = useSelector<RootState, SizeState>((state) => state.size);
    const colorState = useSelector<RootState, ColorState>((state) => state.color);
    const typeState = useSelector<RootState, TypeState>((state) => state.type);
    const [description, setDescription] = React.useState('');
    const [avatar, setAvatar] = React.useState<FilePreview>();
    const [images, setImages] = React.useState<FilePreview[]>();
    const [selectedType, setSelectedType] = React.useState<Type>(typeState.data[0]);
    const [selectedTypeList, setSelectedTypeList] = React.useState<Type[]>([]);
    const [selectedColor, setSelectedColor] = React.useState<Color>(colorState.data[0]);
    const [selectedColorList, setSelectedColorList] = React.useState<Color[]>([]);
    const [selectedSize, setSelectedSize] = React.useState<Size>(sizeState.data[0]);
    const [selectedSizeList, setSelectedSizeList] = React.useState<Size[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<ProductStatus>(ProductStatus.AVAILABLE);
    const { handleSubmit, register } = useForm<ProductAddFormDTO>();

    const onSubmit = async (data: ProductAddFormDTO) => {
        const newProduct: ProductAddFormDTO = {
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: description,
            images: images as File[],
            productAvatar: avatar as File,
            sizes: selectedSizeList.map((size) => size.ID),
            colors: selectedColorList.map((color) => color.ID),
            types: selectedTypeList.map((type) => type.ID),
            status: selectedStatus,
        };
        const res = await store.dispatch(productThunk.adminAddNewProduct(newProduct));
        if (res.meta.requestStatus === 'fulfilled') {
            notificationHelper.success('Add new product success!');
        }
    };
    const handleAvatarPreview = (e: any) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };
    const handleImagePreview = (e: any) => {
        const files = e.target.files as FilePreview[];

        let fileList = Array.from(files).map((file) => {
            file.preview = URL.createObjectURL(file);
            return file;
        });

        if (images) {
            //merge old and new files
            fileList = [...images].concat(
                [...files].filter((filFile) => [...images].every((image) => image.name !== filFile.name))
            );
        }
        setImages(fileList);
    };

    return (
        <form
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 space-y-8 divide-y divide-gray-200 bg-gray-50 intro-y"
        >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Add new product</h3>
                        <p className="max-w-2xl mt-1 text-sm text-gray-500">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                        {/* name */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Name
                            </label>
                            <InputField field="name" required={true} message={''} register={register} />
                        </div>
                        {/* Quantity */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Quantity
                            </label>
                            <InputField
                                type="number"
                                field="quantity"
                                required={true}
                                message={''}
                                register={register}
                            />
                        </div>
                        {/* Price */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Price
                            </label>
                            <InputField type="number" field="price" required={true} message={''} register={register} />
                        </div>
                        {/* type */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="types" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Type
                            </label>
                            <TypeInput
                                selectedType={selectedType}
                                setSelectedType={setSelectedType}
                                typeState={typeState}
                                selectedTypeList={selectedTypeList}
                                setSelectedTypeList={setSelectedTypeList}
                            />
                        </div>

                        {/* color */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="colors"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Color
                            </label>
                            <ColorInput
                                colorState={colorState}
                                selectedColor={selectedColor}
                                selectedColorList={selectedColorList}
                                setSelectedColor={setSelectedColor}
                                setSelectedColorList={setSelectedColorList}
                            />
                        </div>
                        {/* size */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Size
                            </label>
                            <SizeInput
                                sizeState={sizeState}
                                setSelectedSize={setSelectedSize}
                                selectedSize={selectedSize}
                                selectedSizeList={selectedSizeList}
                                setSelectedSizeList={setSelectedSizeList}
                            />
                        </div>
                        {/* status */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Status
                            </label>
                            <StatusInput selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                        </div>
                        {/* description */}
                        <div className="w-full sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Description
                            </label>

                            <ReactQuill
                                placeholder="Type something about this product..."
                                value={description}
                                onChange={setDescription}
                                className="col-span-2 min-h-2xl"
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                                        ['blockquote', 'code-block'],
                                        ['link', 'video', 'image'],
                                        [{ header: 1 }, { header: 2 }], // custom button values
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                                        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                                        [{ direction: 'rtl' }], // text direction
                                        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                        [{ color: [] }, { background: [] }],
                                        [{ font: [] }],
                                        [{ align: [] }],
                                        ['clean'], // remove formatting button
                                    ],
                                }}
                            />
                        </div>
                        {/* avatar */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Avatar
                            </label>
                            <AvatarInput
                                handleAvatarPreview={handleAvatarPreview}
                                avatar={avatar}
                                setAvatar={setAvatar}
                            />
                        </div>
                        {/* images */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Images
                            </label>
                            <ImagesInput
                                handleImagePreview={handleImagePreview}
                                images={images}
                                setImages={setImages}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-100 bg-red-500 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddProductForm;
