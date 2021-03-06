import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AddTypeDTO } from '../../../../common/interfaces/DTO/typeDTO';
import { FormState } from '../../../../common/interfaces/Redux/form';
import InputField from '../../../../components/common/InputField';
import { RootState, store } from '../../../../redux';
import { formAction } from '../../../../redux/form/form';
import { typeThunk } from '../../../../redux/type/typeThunk';
import * as notificationHelper from '../../../../utils/notificationHelper';

interface AddTypeFormProps {}

const AddTypeForm: React.FunctionComponent<AddTypeFormProps> = () => {
    const { handleSubmit, register, reset } = useForm<AddTypeDTO>();
    const formState = useSelector<RootState, FormState>((state) => state.form);

    const onSubmit = async (data: AddTypeDTO) => {
        const result = await store.dispatch(typeThunk.adminAddNewType(data));
        if (result.meta.requestStatus === 'fulfilled') {
            notificationHelper.success(
                'Add new Type success !',
                'now you can use this Type in any where in your store!'
            );
            reset();
            store.dispatch(formAction.resetAddTypeForm());
        }
    };
    return (
        <div className="w-full h-full p-5 space-y-8 divide-y divide-gray-200 bg-gray-50 intro-y">
            <div className="m-auto bg-white shadow w-max sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add new type</h3>
                    <div className="max-w-xl mt-2 text-sm text-gray-500">
                        <p>Full fill the form to add new type to your store</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 sm:flex sm:flex-col sm:items-start">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Name of type
                            </label>
                            <InputField
                                type="text"
                                autoComplete={false}
                                field="name"
                                required={true}
                                message={formState.addType.name}
                                register={register}
                            />
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

export default AddTypeForm;
