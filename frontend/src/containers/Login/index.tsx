import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { RootState, store } from '../../redux';
import InputField from '../../components/common/InputField';
import * as notificationHelper from '../../utils/notificationHelper';
import { formThunk } from '../../redux/form/formThunk';
import { useSelector } from 'react-redux';
import { formAction } from '../../redux/form/form';
import { UserState } from '../../common/interfaces/Redux/user';
import { LoginUserDTO } from '../../common/interfaces/DTO/userDTO';
import { FormState } from '../../common/interfaces/Redux/form';
import * as urlLink from '../../consts/url';
interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
    const { handleSubmit, register } = useForm<LoginUserDTO>();
    const history = useHistory();
    const formState = useSelector<RootState, FormState>((state) => state.form);
    const userState = useSelector<RootState, UserState>((state) => state.user);
    React.useEffect(() => {
        if (userState.isLogin) {
            history.goBack();
        }
    }, [userState.isLogin, history]);

    const onSubmit = async (data: LoginUserDTO) => {
        const result = await store.dispatch(formThunk.login(data));
        if (result.meta.requestStatus === 'fulfilled') {
            notificationHelper.success('Login success!');
            store.dispatch(formAction.resetLoginForm());
            history.push('/');
            return;
        }
    };

    return (
        <div className="flex flex-col justify-center flex-1 pt-16 bg-gray-50 sm:px-6 lg:px-8 intro-y">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="w-auto h-12 mx-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <InputField
                                label="Username"
                                field="username"
                                message={formState.login.username}
                                register={register}
                                type="text"
                            />
                        </div>

                        <InputField
                            type="password"
                            label="Password"
                            field="password"
                            message={formState.login.password}
                            register={register}
                        />

                        {/* <div className="flex items-center justify-between">
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
                                <Link
                                    to="#forgotpassword"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div> */}
                        <div className="mt-2">
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
                                    to={urlLink.REGISTER}
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
