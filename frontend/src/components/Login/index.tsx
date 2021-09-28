import * as React from "react";
import InputField from "../common/InputField";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
interface LoginProps {}
interface LoginField {
    username: String;
    password: String;
}

const Login: React.FunctionComponent<LoginProps> = () => {
    const [loading, setLoading] = React.useState(false);
    const { handleSubmit, register } = useForm<LoginField>();
    function handleClick() {
        setLoading(true);
        setInterval(() => {
            setLoading(false);
        }, 5000);
    }
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-4 text-white"
            >
                <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    className="text-white"
                    {...register("username")}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    {...register("password")}
                />
                {/* <InputField
                    label="Username"
                    field="username"
                    register={register}
                />
                <InputField
                    label="Password"
                    field="password"
                    type="password"
                    register={register}
                /> */}
                <div className="w-full mt-4">
                    {/* <button
                        className="w-full px-5 py-3 text-sm font-medium text-white transition-all bg-blue-400 rounded hover:bg-blue-600 active:bg-grey-900 focus:outline-none focus:border-purple-200"
                        type="submit"
                    >
                        Button
                    </button> */}
                    <LoadingButton
                        onClick={handleClick}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        className="w-full"
                        color="primary"
                    >
                        Send
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default Login;
