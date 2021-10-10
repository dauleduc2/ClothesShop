import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as validateHelper from '../../utils/validateHelper';
import { useState } from 'react';
import axiosClient from '../../axios/config';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import { isEqual } from 'lodash';
import { notificationHelper } from '../../utils/notificationHelper';
interface RegisterProps {}
interface RegisterField {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
}
interface duplicateError {
    username?: string;
    email?: string;
}
const defaultValues: RegisterField = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
};
const Register: React.FunctionComponent<RegisterProps> = () => {
    const [errorList, setErrorList] = useState<RegisterField>(defaultValues);
    const { handleSubmit, register } = useForm<RegisterField>();
    const noti = new notificationHelper();
    const history = useHistory();
    //validation
    const validation = (data: RegisterField): RegisterField => {
        let errorList: RegisterField = { ...defaultValues };
        //email validation
        if (!validateHelper.validateEmail(data.email)) errorList.email = 'Invalid email';
        if (!data.email) errorList.email = 'Required';
        //full name
        if (!validateHelper.length(data.fullName, 3, 255))
            errorList.fullName = 'The number of character must between 3 - 255';
        if (!data.fullName) errorList.fullName = 'Required';
        //username
        if (!validateHelper.length(data.username, 6, 255))
            errorList.username = 'The number of character must between 6 - 255';
        if (!data.username) errorList.username = 'Required';
        //password
        if (!validateHelper.length(data.password, 6, 255))
            errorList.password = 'The number of character must between 6 - 255';
        if (!data.password) errorList.password = 'Required';
        //confirmPassword
        if (data.password !== data.confirmPassword)
            errorList.confirmPassword = 'Confirm password must be the same as password';
        if (!data.confirmPassword) errorList.confirmPassword = 'Required';

        //return
        return errorList;
    };
    //on submit
    const onSubmit = async (data: RegisterField) => {
        const validateResult = validation(data);
        setErrorList(validateResult);

        if (isEqual(validateResult, defaultValues)) {
            const response: any = await axiosClient
                .post('/api/user/register', {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    fullName: data.fullName,
                })
                .catch((error) => {
                    const message = error.response?.data.detail.message;
                    const responseData = error.response?.data.data;
                    let duplicateError: duplicateError = {};
                    if (message) {
                        if (responseData[0].username === true)
                            duplicateError.username = 'The username is already existed';

                        if (responseData[0].email === true) duplicateError.email = 'The email is already existed';
                        setErrorList({
                            ...errorList,
                            ...duplicateError,
                        });
                    } else {
                        noti.warning('There something wrong during connect to server!');
                    }
                });
            if (response) {
                noti.success('Register success!');
                history.push('/user/login');
            }
        }
    };
    return (
        <div className="flex flex-col justify-center bg-gray-50 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mb-3 text-3xl font-extrabold text-center text-gray-900 ">Register</h2>
            </div>
            <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Email"
                            field="email"
                            error={Boolean(errorList?.email)}
                            message={errorList?.email}
                            register={register}
                            type="text"
                        />

                        <InputField
                            label="Full name"
                            field="fullName"
                            error={Boolean(errorList?.fullName)}
                            message={errorList?.fullName}
                            register={register}
                            type="text"
                        />

                        <InputField
                            label="username"
                            field="username"
                            error={Boolean(errorList?.username)}
                            message={errorList?.username}
                            register={register}
                            type="text"
                        />

                        <InputField
                            type="password"
                            label="Password"
                            field="password"
                            error={Boolean(errorList?.password)}
                            message={errorList?.password}
                            register={register}
                        />
                        <InputField
                            type="password"
                            label="Confirm Password"
                            field="confirmPassword"
                            error={Boolean(errorList?.confirmPassword)}
                            message={errorList?.confirmPassword}
                            register={register}
                        />

                        <button
                            type="submit"
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>

                        <div className="flex justify-end">
                            <div className="self-end text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/user/login"
                                    className="font-semibold text-indigo-600 underline hover:text-indigo-500"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
