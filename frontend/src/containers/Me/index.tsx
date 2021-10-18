import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { UpdateUserField, UserState } from '../../common/interfaces/user';
import { userThunk } from '../../redux/user/userThunk';
import { store } from '../../redux';
import * as notificationHelper from '../../utils/notificationHelper';
import InputField from '../../components/common/InputField';
import InputAvatar from '../../components/common/InputAvatar';
import InformationField from '../../components/common/InformationField';
import { formState } from '../../common/interfaces/form';

interface MeProps {}

const defaultValues: UpdateUserField = { email: '', fullName: '', avatar: null };

const Me: React.FunctionComponent<MeProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const formState = useSelector<RootState, formState>((state) => state.form);
    const [file, setFile] = React.useState<File | null>();
    const { handleSubmit, register, setValue } = useForm<UpdateUserField>({ defaultValues: defaultValues });
    //set default value on first render
    React.useEffect(() => {
        setValue('email', userState.user.email);
        setValue('fullName', userState.user.fullName);
    }, [userState.user.email, userState.user.fullName, setValue]);

    const onSubmit = (data: UpdateUserField) => {
        if (file) {
            data.avatar = file;
        }
        store.dispatch(userThunk.updateUser(data));
        notificationHelper.success('Update success!');
    };
    return (
        <div className="flex flex-col items-center justify-center flex-1 intro-y">
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
                                message={formState.updateUser.fullName}
                                defaultValue={userState.user.fullName}
                                register={register}
                            />
                        </InformationField>
                        <InformationField label="Email">
                            <InputField
                                field="email"
                                message={formState.updateUser.email}
                                defaultValue={userState.user.email}
                                register={register}
                            />
                        </InformationField>
                        <InformationField label="Avatar">
                            <InputAvatar
                                field="avatar"
                                buttonName="Change avatar"
                                avatarUrl={
                                    Boolean(userState.user.avatar)
                                        ? `${process.env.REACT_APP_SERVER_URL}/${userState.user.avatar}`
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
