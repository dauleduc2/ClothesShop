import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import * as notificationHelper from '../../utils/notificationHelper';
import { formState, RegisterUserDTO } from '../../common/interfaces/form';
import { RootState, store } from '../../redux';
import { formThunk } from '../../redux/form/formThunk';
import { useSelector } from 'react-redux';
interface RegisterProps {}

const Register: React.FunctionComponent<RegisterProps> = () => {
    const { handleSubmit, register } = useForm<RegisterUserDTO>();
    const formState = useSelector<RootState, formState>((state) => state.form);
    const history = useHistory();

    //on submit
    const onSubmit = async (data: RegisterUserDTO) => {
        const result = await store.dispatch(formThunk.register(data));
        if (result.meta.requestStatus === 'fulfilled') {
            notificationHelper.success('Register success!');
            history.push('/user/login');
        }
    };
    return (
        <div className="flex flex-col justify-center bg-gray-50 sm:px-6 lg:px-8 intro-y">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mb-3 text-3xl font-extrabold text-center text-gray-900 ">Register</h2>
            </div>
            <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Email"
                            field="email"
                            message={formState.register.email}
                            register={register}
                            type="text"
                        />

                        <InputField
                            label="Full name"
                            field="fullName"
                            message={formState.register.fullName}
                            register={register}
                            type="text"
                        />

                        <InputField
                            label="username"
                            field="username"
                            message={formState.register.username}
                            register={register}
                            type="text"
                        />

                        <InputField
                            type="password"
                            label="Password"
                            field="password"
                            message={formState.register.password}
                            register={register}
                        />
                        <InputField
                            type="password"
                            label="Confirm Password"
                            field="confirmPassword"
                            message={formState.register.confirmPassword}
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
