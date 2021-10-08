import * as React from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField, Typography } from '@mui/material';
import './style.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as validateHelper from '../../utils/validateHelper';
import axiosClient from '../../axios/config';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { store } from '../../redux';
import { userListAction } from '../../redux/user/user';
import { isEqual } from 'lodash';
import InputField from '../../components/common/InputField';
interface LoginProps {}
interface LoginField {
    username: string;
    password: string;
}

const defaultValues: LoginField = {
    username: '',
    password: '',
};

const Login: React.FunctionComponent<LoginProps> = () => {
    // const [loading, setLoading] = useState(false);
    const [errorList, setErrorList] = useState<LoginField>(defaultValues);
    const { handleSubmit, register } = useForm<LoginField>({
        defaultValues,
    });
    const history = useHistory();

    //validation
    const validation = (data: LoginField) => {
        let errorList = { ...defaultValues };
        //username
        if (!validateHelper.length(data.username, 6, 255))
            errorList.username = 'The number of character must between 6 - 255';
        if (!data.username) errorList.username = 'Required';
        //password
        if (!validateHelper.length(data.password, 6, 255))
            errorList.password = 'The number of character must between 6 - 255';
        if (!data.password) errorList.password = 'Required';

        //return
        return errorList;
    };
    const onSubmit = async (data: LoginField) => {
        const validateResult = validation(data);
        setErrorList(validateResult);
        if (isEqual(validateResult, defaultValues)) {
            const response: any = await axiosClient
                .post('/api/user/login', {
                    username: data.username,
                    password: data.password,
                })
                .catch((error) => {
                    const message = error.response?.data.detail.message;
                    if (message) {
                        toast.warning(message);
                    } else {
                        toast.warning('There something wrong during connect to server!');
                    }
                });
            if (response) {
                store.dispatch(userListAction.setLogin(true));
                toast.success('Login success!');
                history.push('/user/me');
            }
        }
    };

    return (
        // <div className="flex flex-col items-center justify-center w-full overflow-y-auto h-contentHeight">
        //     <Typography variant="h3" gutterBottom component="div" className="font-bold text-black">
        //         Log in
        //     </Typography>
        //     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-10/12 max-w-sm p-4 lg:w-6/12">
        //         {/* <TextField
        //             id="username"
        //             label="Username"
        //             variant="standard"
        //             className="mb-5"
        //             fullWidth
        //             error={Boolean(errorList?.username)}
        //             helperText={errorList?.username}
        //             {...register('username')}
        //         /> */}
        //         {/* <TextField
        //             id="password"
        //             fullWidth
        //             label="Password"
        //             variant="standard"
        //             className="mb-5"
        //             type="password"
        //             error={Boolean(errorList?.password)}
        //             helperText={errorList?.password}
        //             {...register('password')}
        //         /> */}
        //         <InputField
        //             label="Username"
        //             field="username"
        //             error={Boolean(errorList?.username)}
        //             message={errorList?.username}
        //             register={register}
        //             type="text"
        //         />
        //         <InputField
        //             type="password"
        //             label="Password"
        //             field="password"
        //             error={Boolean(errorList?.password)}
        //             message={errorList?.password}
        //             register={register}
        //         />

        //         <div className="w-full mt-4">
        //             {/* <LoadingButton
        //                 onClick={handleClick}
        //                 loading={loading}
        //                 loadingPosition="end"
        //                 variant="contained"
        //                 className="w-full"
        //                 color="primary"
        //             >
        //                 Login
        //             </LoadingButton> */}
        //             <button
        //                 type="button"
        //                 className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm w- hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //             >
        //                 Button text
        //             </button>
        //             <input type="submit" id="submitButton" value="" className="invisible" />
        //         </div>
        //         <Typography variant="caption" display="block" gutterBottom className="self-end mt-4">
        //             Don't have account yet?
        //             <Link to="/user/register" className="underline">
        //                 Register
        //             </Link>
        //         </Typography>
        //     </form>
        // </div>
        <div className="flex flex-col justify-center py-12 overflow-y-auto bg-gray-50 sm:px-6 lg:px-8 h-contentHeight">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <img
                    className="w-auto h-12 mx-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                /> */}
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <InputField
                                label="Username"
                                field="username"
                                error={Boolean(errorList?.username)}
                                message={errorList?.username}
                                register={register}
                                type="text"
                            />
                        </div>

                        <InputField
                            type="password"
                            label="Password"
                            field="password"
                            error={Boolean(errorList?.password)}
                            message={errorList?.password}
                            register={register}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#forgotpassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <div className="self-end mt-4 text-sm">
                                Don't have account yet?{' '}
                                <Link
                                    to="/user/register"
                                    className="font-semibold text-indigo-600 underline hover:text-indigo-500"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
