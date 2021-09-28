import * as React from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
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
                className="flex flex-col w-6/12 max-w-sm p-4 text-white"
            >
                <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    className="text-white"
                    fullWidth
                    {...register("username")}
                />
                <TextField
                    id="password"
                    fullWidth
                    label="Password"
                    variant="standard"
                    {...register("password")}
                />
                <div className="w-full mt-4">
                    <LoadingButton
                        onClick={handleClick}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        className="w-full"
                        color="primary"
                        type="submit"
                    >
                        Send
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default Login;
