import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import * as validateHelper from '../../utils/validateHelper';
import { UpdateUserField, UserState } from '../../common/interfaces/user';
import { userThunk } from '../../redux/user/userThunk';
import { store } from '../../redux';
import { isEqual } from 'lodash';
import InputField from '../../components/common/InputField';
import { notificationHelper } from '../../utils/notificationHelper';

interface MeProps {}

const defaultValues: UpdateUserField = { email: '', fullName: '', avatar: null };

interface ErrorField {
    email: string;
    fullName: string;
    avatar: File | string | null;
}
const Me: React.FunctionComponent<MeProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const [errorList, setErrorList] = React.useState<UpdateUserField>(defaultValues);
    const [file, setFile] = React.useState<File | null>();
    const { handleSubmit, register, setValue } = useForm<UpdateUserField>({ defaultValues: defaultValues });
    const noti = new notificationHelper();
    //set default value on first render
    React.useEffect(() => {
        setValue('email', userState.user.email);
        setValue('fullName', userState.user.fullName);
    }, [userState.user.email, userState.user.fullName, setValue]);
    //validation
    const validation = (data: UpdateUserField): ErrorField => {
        let errorList = { ...defaultValues };
        //fullName
        if (!validateHelper.length(data.fullName, 3, 255))
            errorList.fullName = 'The number of character must between 3 - 255';
        if (!data.fullName) errorList.fullName = 'Required';
        //email
        if (!validateHelper.validateEmail(data.email)) errorList.email = 'Invalid email';
        if (!data.email) errorList.email = 'Required';

        return errorList;
    };
    //on submit form
    const onSubmit = (data: UpdateUserField) => {
        const validateResult = validation(data);
        if (file) {
            data.avatar = file;
        }
        setErrorList(validateResult);
        if (isEqual(validateResult, defaultValues)) {
            store.dispatch(userThunk.updateUser(data));
            noti.success('Update success!');
        }
    };
    return (
        <div className="flex flex-col items-center w-full overflow-y-auto bg-gray-100 sm:bg-sky-800 sm:justify-center h-contentHeight">
            <form
                className="flex justify-center w-full shadow-md sm:w-auto sm:items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col w-full sm:w-auto">
                    <div className="p-5 mb-0 text-3xl font-semibold text-left bg-gray-100 rounded-t sm:p-10 sm:mb-4 text-sky-800">
                        <p>Information</p>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row">
                        <div className="flex w-full p-5 mr-0 bg-gray-100 rounded-bl sm:p-20 sm:mr-4 sm:w-180">
                            <ul className="w-full text-lg text-right text-gray-600">
                                <li className="mb-5 sm:mb-10">
                                    <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                        <p className="w-auto mr-4 text-left text-blue-900 sm:text-right sm:w-32">
                                            Username
                                        </p>
                                        <p className="w-auto text-left text-gray-800">{userState.user.username}</p>
                                    </div>
                                </li>
                                <li className="mb-5 sm:mb-10">
                                    <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                        <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">Full name</p>
                                        <InputField
                                            register={register}
                                            field="fullName"
                                            type="text"
                                            placeholder="fullName"
                                            error={Boolean(errorList?.fullName.length)}
                                            message={errorList?.fullName}
                                        />
                                    </div>
                                </li>
                                <li className="flex mb-5 sm:mb-10">
                                    <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                        <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">Email</p>
                                        <InputField
                                            register={register}
                                            field="email"
                                            type="text"
                                            placeholder="Email"
                                            error={Boolean(errorList?.email.length)}
                                            message={errorList?.email}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="flex flex-col text-xl font-medium sm:flex-row">
                                        <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">Create Date</p>
                                        <p className="w-auto text-left text-gray-800">{userState.user.createDate}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center justify-center p-10 bg-gray-100 rounded-br sm:p-20">
                            <div className="sm:mb-8">
                                <div className="relative">
                                    <label htmlFor="raised-button-file" className="cursor-pointer">
                                        <Avatar
                                            alt={userState.user.username ? userState.user.username : 'avatar of user'}
                                            src={
                                                file
                                                    ? URL.createObjectURL(file)
                                                    : userState.user.avatar
                                                    ? `${process.env.REACT_APP_SERVER_URL}/${userState.user.avatar}`
                                                    : '../images/avatar.png'
                                            }
                                            sx={{ width: 160, height: 160 }}
                                        />
                                        <input
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            id="raised-button-file"
                                            type="file"
                                            onChange={(event) => {
                                                if (event.currentTarget.files) {
                                                    setFile(event.currentTarget.files[0]);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <Button size="large" type="submit" className="hidden sm:block">
                                Update information
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col h-auto mt-4 bg-gray-100 sm:hidden">
                        <Button size="large" type="submit">
                            Update information
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Me;
