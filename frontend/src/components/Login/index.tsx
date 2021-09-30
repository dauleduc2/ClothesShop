import * as React from "react";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";

interface LoginProps {}
interface LoginField {
    username: String;
    password: String;
}

const Login: React.FunctionComponent<LoginProps> = () => {
    const { handleSubmit, register } = useForm<LoginField>();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 border-sky-400 p-4 rounded"
            >
                <InputField
                    label="Username"
                    field="username"
                    register={register}
                />
                <InputField
                    label="Password"
                    field="password"
                    type="password"
                    register={register}
                />
                <div className="mt-4 w-full">
                    <button
                        className="px-5 py-3 rounded text-sm font-medium text-white bg-blue-400 hover:bg-blue-600 active:bg-grey-900 focus:outline-none  focus:border-purple-200 transition-all w-full"
                        type="submit"
                    >
                        Button
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
