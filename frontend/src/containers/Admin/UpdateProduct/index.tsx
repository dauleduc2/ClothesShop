import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { RootState, store } from '../../../redux';
import { SizeState } from '../../../common/interfaces/Redux/size';
import { ColorState } from '../../../common/interfaces/Redux/color';
import { TypeState } from '../../../common/interfaces/Redux/type';
import { Type } from '../../../common/interfaces/Model/Type';
import { Color } from '../../../common/interfaces/Model/Color';
import { Size } from '../../../common/interfaces/Model/Size';
import { ProductStatusString } from '../../../common/interfaces/Model/Product';
import { ProductAddFormDTO, UpdateProductDTO } from '../../../common/interfaces/DTO/productDTO';
import { productThunk } from '../../../redux/product/productThunk';
import * as notificationHelper from '../../../utils/notificationHelper';
import InputField from '../../../components/common/InputField';
import TypeInput from '../../../components/common/TypeInput';
import ColorInput from '../../../components/common/colorInput';
import SizeInput from '../../../components/common/SizeInput';
import StatusInput from '../../../components/common/statusInput';
import AvatarInput from '../../../components/common/avatarInput';
import ImagesInput from '../../../components/common/imagesInput';
import { sizeThunk } from '../../../redux/size/sizeThunk';
import { typeThunk } from '../../../redux/type/typeThunk';
import { colorThunk } from '../../../redux/color/colorThunk';
import { RouteComponentProps } from 'react-router';
import { ProductState } from '../../../common/interfaces/Redux/product';
import ReactQuillInput from '../../../components/common/quillInput';
import { Image } from '../../../common/interfaces/Model/Image';
import { productApi } from '../../../api/productApi';
interface UpdateProductParams {
    productName: string;
}

interface UpdateProductFormProps extends RouteComponentProps<UpdateProductParams> {}

export interface FilePreview extends File {
    preview: string;
}

const UpdateProductForm: React.FunctionComponent<UpdateProductFormProps> = ({ match }) => {
    const sizeState = useSelector<RootState, SizeState>((state) => state.size);
    const colorState = useSelector<RootState, ColorState>((state) => state.color);
    const typeState = useSelector<RootState, TypeState>((state) => state.type);
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    const [description, setDescription] = React.useState('');
    const [avatar, setAvatar] = React.useState<FilePreview>();
    const [initAvatar, setInitAvatar] = React.useState<string>();
    const [images, setImages] = React.useState<FilePreview[]>();
    const [initImages, setInitImages] = React.useState<Image[]>();
    const [selectedType, setSelectedType] = React.useState<Type>(typeState.data[0]);
    const [selectedTypeList, setSelectedTypeList] = React.useState<Type[]>([]);
    const [selectedColor, setSelectedColor] = React.useState<Color>(colorState.data[0]);
    const [selectedColorList, setSelectedColorList] = React.useState<Color[]>([]);
    const [selectedSize, setSelectedSize] = React.useState<Size>(sizeState.data[0]);
    const [selectedSizeList, setSelectedSizeList] = React.useState<Size[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<ProductStatusString>('AVAILABLE');
    const { handleSubmit, register, setValue } = useForm<ProductAddFormDTO>();
    //calling api to get all size, color, type
    React.useLayoutEffect(() => {
        store.dispatch(sizeThunk.adminGetAllSize());
        store.dispatch(typeThunk.adminGetAllType());
        store.dispatch(colorThunk.adminGetAllColor());
        return () => {};
    }, []);
    //calling api to get current product info
    React.useLayoutEffect(() => {
        store.dispatch(productThunk.getSpecificProduct(match.params.productName));
    }, [match.params.productName]);
    //set value on first render
    React.useLayoutEffect(() => {
        if (productState.currentProduct) {
            const { name, quantity, price, types, colors, sizes, description, status, productAvatar, images } =
                productState.currentProduct;
            setValue('name', name);
            setValue('quantity', quantity);
            setValue('price', price);
            setSelectedTypeList(types);
            setSelectedColorList(colors);
            setSelectedSizeList(sizes);
            setDescription(description);
            setSelectedStatus(status);
            setInitAvatar(productAvatar);
            setInitImages(images);
        }
        return () => {};
    }, [productState.currentProduct, setValue]);

    const onSubmit = async (data: UpdateProductDTO) => {
        const updateProduct: UpdateProductDTO = {
            ID: productState.currentProduct.ID,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: description,
            sizes: selectedSizeList.map((item) => item.ID),
            types: selectedTypeList.map((item) => item.ID),
            colors: selectedColorList.map((item) => item.ID),
            status: selectedStatus,
        };
        if (avatar) {
            updateProduct.newProductAvatar = avatar;
        } else if (initAvatar) {
            updateProduct.productAvatar = initAvatar;
        }
        if (images && images?.length > 0) {
            updateProduct.newImages = images;
        }
        if (initImages && initImages.length > 0) {
            updateProduct.images = initImages.map((item) => item.ID);
        }
        const result = await productApi.updateProduct(updateProduct);
        if (result.status === 200) {
            notificationHelper.success('Update product success');
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Update product</h3>
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
                            {typeState.data && typeState.data.length > 0 && (
                                <TypeInput
                                    selectedType={selectedType}
                                    setSelectedType={setSelectedType}
                                    typeState={typeState}
                                    selectedTypeList={selectedTypeList}
                                    setSelectedTypeList={setSelectedTypeList}
                                />
                            )}
                        </div>

                        {/* color */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="colors"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Color
                            </label>
                            {colorState.data.length > 0 && (
                                <ColorInput
                                    colorState={colorState}
                                    selectedColor={selectedColor}
                                    selectedColorList={selectedColorList}
                                    setSelectedColor={setSelectedColor}
                                    setSelectedColorList={setSelectedColorList}
                                />
                            )}
                        </div>
                        {/* size */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Size
                            </label>
                            {sizeState.data && sizeState.data.length > 0 && (
                                <SizeInput
                                    sizeState={sizeState}
                                    setSelectedSize={setSelectedSize}
                                    selectedSize={selectedSize}
                                    selectedSizeList={selectedSizeList}
                                    setSelectedSizeList={setSelectedSizeList}
                                />
                            )}
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

                            <ReactQuillInput description={description} setDescription={setDescription} />
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
                                initAvatar={initAvatar}
                                setInitAvatar={setInitAvatar}
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
                                initImages={initImages}
                                setInitImages={setInitImages}
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

export default UpdateProductForm;
