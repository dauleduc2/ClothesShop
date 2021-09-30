import * as React from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
interface RegisterProps {}
interface RegisterField {
    username: String;
    password: String;
    confirmPassword: String;
    email: String;
    fullName: String;
}

const Register: React.FunctionComponent<RegisterProps> = () => {
    const [loading, setLoading] = React.useState(false);
    const { handleSubmit, register } = useForm<RegisterField>();
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
                Register
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-10/12 max-w-sm p-4 lg:w-6/12"
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    className="mb-5"
                    fullWidth
                    {...register("email")}
                />
                <TextField
                    id="fullName"
                    label="Full name"
                    variant="standard"
                    className="mb-5"
                    fullWidth
                    {...register("fullName")}
                />
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
                <TextField
                    id="confirmPassword"
                    fullWidth
                    label="Confirm password"
                    variant="standard"
                    className="mb-5"
                    {...register("confirmPassword")}
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
                        Register
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
                    Already have an acccount?{" "}
                    <Link to="/user/login" className="underline">
                        Log in
                    </Link>
                </Typography>
            </form>
        </div>
    );
};

export default Register;
