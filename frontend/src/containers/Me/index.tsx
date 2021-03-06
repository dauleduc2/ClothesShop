import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { userThunk } from '../../redux/user/userThunk';
import { store } from '../../redux';
import * as notificationHelper from '../../utils/notificationHelper';
import InputField from '../../components/common/InputField';
import InputAvatar from '../../components/common/InputAvatar';
import InformationField from '../../components/common/InformationField';
import { cleanObject } from '../../utils/dataHelper';
import { formAction } from '../../redux/form/form';
import { UserState } from '../../common/interfaces/Redux/user';
import { FormState } from '../../common/interfaces/Redux/form';
import { UpdateUserFieldDTO } from '../../common/interfaces/DTO/userDTO';
import * as urlLink from '../../consts/url';
interface MeProps {}

const defaultValues: UpdateUserFieldDTO = { email: '', fullName: '', avatar: '', address: '', phoneNumber: '' };

const Me: React.FunctionComponent<MeProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const formState = useSelector<RootState, FormState>((state) => state.form);
    const [file, setFile] = React.useState<File>();
    const { handleSubmit, register, setValue } = useForm<UpdateUserFieldDTO>({ defaultValues: defaultValues });
    //set default value on first render
    React.useLayoutEffect(() => {
        setValue('email', userState.user.email);
        setValue('fullName', userState.user.fullName);
        setValue('address', userState.user.address);
        setValue('phoneNumber', userState.user.phoneNumber);
    }, [userState.user.email, userState.user.fullName, setValue, userState.user.address, userState.user.phoneNumber]);
    //reset update form on first render
    React.useLayoutEffect(() => {
        store.dispatch(formAction.resetUpdateUserForm());
    }, []);
    // on submit form
    const onSubmit = async (data: UpdateUserFieldDTO) => {
        if (file) {
            data.avatar = file;
        }
        const result = await store.dispatch(userThunk.updateUser(cleanObject(data)));
        if (result.meta.requestStatus === 'fulfilled') {
            store.dispatch(formAction.resetUpdateUserForm());
            notificationHelper.success('Update success!');
        }
    };
    return (
        <div className="flex flex-col items-center justify-center flex-1 pt-16 intro-y">
            <form
                className="w-full overflow-hidden bg-white sm:shadow sm:rounded-lg sm:w-180"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Applicant Information</h3>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">Personal details.</p>
                </div>
                <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <InformationField label="Username">
                            <p>{userState.user.username}</p>
                        </InformationField>
                        <InformationField label="Full name">
                            <InputField
                                field="fullName"
                                required={true}
                                message={formState.updateUser.fullName}
                                defaultValue={userState.user.fullName}
                                register={register}
                            />
                        </InformationField>
                        <InformationField label="Email">
                            <InputField
                                field="email"
                                required={true}
                                message={formState.updateUser.email}
                                defaultValue={userState.user.email}
                                register={register}
                            />
                        </InformationField>
                        <InformationField label="Address">
                            <InputField
                                field="address"
                                message={formState.updateUser.address}
                                defaultValue={userState.user.address}
                                register={register}
                            />
                        </InformationField>
                        <InformationField label="Phone number">
                            <InputField
                                field="phoneNumber"
                                message={formState.updateUser.phoneNumber}
                                defaultValue={userState.user.phoneNumber}
                                register={register}
                            />
                        </InformationField>
                        <InformationField label="Avatar">
                            <InputAvatar
                                field="avatar"
                                buttonName="Change avatar"
                                avatarUrl={
                                    Boolean(userState.user.avatar)
                                        ? `${urlLink.ENV_SERVER}/${userState.user.avatar}`
                                        : '/images/avatar.png'
                                }
                                setFile={setFile}
                            />
                        </InformationField>
                        <InformationField label="Create date">
                            <p>{new Date(userState.user.createDate).toDateString()}</p>
                        </InformationField>
                    </dl>
                </div>
                <div className="flex justify-end px-4 py-5 sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Me;
