import { useForm } from 'react-hook-form';
import { AddColorDTO } from '../../../../common/interfaces/DTO/colorDTO';
import InputField from '../../../../components/common/InputField';

interface AddColorFormProps {}

const AddColorForm: React.FunctionComponent<AddColorFormProps> = () => {
    const { handleSubmit, register } = useForm<AddColorDTO>();
    const onSubmit = (data: AddColorDTO) => {
        console.log(data);
    };
    return (
        <div className="w-full h-full p-5 space-y-8 divide-y divide-gray-200 bg-gray-50 intro-y">
            <div className="m-auto bg-white shadow w-max sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add new color</h3>
                    <div className="max-w-xl mt-2 text-sm text-gray-500">
                        <p>Full fill the form to add new color to your store,</p>
                        <p>then you can use this color at all product you want.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 sm:flex sm:flex-col sm:items-start">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Name
                            </label>
                            <InputField
                                type="text"
                                autoComplete={false}
                                field="name"
                                required={true}
                                message={''}
                                register={register}
                            />
                        </div>
                        <div className="w-full mt-5 sm:max-w-xs">
                            <label
                                htmlFor="hexCode"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Hex Code
                            </label>
                            <InputField
                                type="text"
                                autoComplete={false}
                                field="hexCode"
                                required={true}
                                message={''}
                                register={register}
                            />
                            <div className="max-w-xl mt-2 text-sm text-gray-500">
                                <p>Please make sure the hexcode is valid hexcode</p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center self-end justify-center w-full px-4 py-2 mt-5 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-5 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddColorForm;
