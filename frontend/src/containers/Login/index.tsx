import * as React from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
interface LoginProps {}
interface LoginField {
    username: String;
    password: String;
}

const Login: React.FunctionComponent<LoginProps> = () => {
    const [loading, setLoading] = React.useState(false);
    const { handleSubmit, register } = useForm<LoginField>();
    function handleClick() {
        document.getElementById("submitButton")?.click();
        setLoading(true);
        setInterval(() => {
            setLoading(false);
        }, 5000);
    }
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full overflow-y-auto h-contentHeight">
            <Typography
                variant="h3"
                gutterBottom
                component="div"
                className="font-bold text-black"
            >
                Log in
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-10/12 max-w-sm p-4 lg:w-6/12"
            >
                <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    className="mb-5"
                    fullWidth
                    {...register("username")}
                />
                <TextField
                    id="password"
                    fullWidth
                    label="Password"
                    variant="standard"
                    className="mb-5"
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
                    >
                        Login
                    </LoadingButton>

                    <input
                        type="submit"
                        id="submitButton"
                        value=""
                        className="invisible"
                    />
                </div>
                <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    className="self-end mt-4"
                >
                    Don't have account yet?{" "}
                    <Link to="/user/register" className="underline">
                        Register
                    </Link>
                </Typography>
            </form>
        </div>
    );
};

export default Login;
