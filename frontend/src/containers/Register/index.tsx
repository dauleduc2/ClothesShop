import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as validateHelper from "../../utils/validateHelper";
import { useState } from "react";
import axiosClient from "../../axios/config";
import * as _ from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
interface RegisterProps {}
interface RegisterField {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    fullName: string;
}
interface ErrorField {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    fullName?: string;
}
interface duplicateError {
    username?: string;
    email?: string;
}
const Register: React.FunctionComponent<RegisterProps> = () => {
    const [loading, setLoading] = useState(false);
    const [errorList, setErrorList] = useState<ErrorField>();
    const { handleSubmit, register } = useForm<RegisterField>();
    const history = useHistory();
    function handleClick() {
        document.getElementById("submitButton")?.click();
        setLoading(true);
    }
    //validation
    const validation = (data: RegisterField): ErrorField => {
        let errorList: ErrorField = {};
        //email validation
        if (!validateHelper.validateEmail(data.email))
            errorList.email = "Invalid email";
        if (!data.email) errorList.email = "Required";
        //full name
        if (!validateHelper.length(data.fullName, 3, 255))
            errorList.fullName = "The number of character must between 3 - 255";
        if (!data.fullName) errorList.fullName = "Required";
        //username
        if (!validateHelper.length(data.username, 6, 255))
            errorList.username = "The number of character must between 6 - 255";
        if (!data.username) errorList.username = "Required";
        //password
        if (!validateHelper.length(data.password, 6, 255))
            errorList.password = "The number of character must between 6 - 255";
        if (!data.password) errorList.password = "Required";
        //confirmPassword
        if (data.password !== data.confirmPassword)
            errorList.confirmPassword =
                "Confirm password must be the same as password";
        if (!data.confirmPassword) errorList.confirmPassword = "Required";

        //return
        return errorList;
    };
    //on submit
    const onSubmit = async (data: RegisterField) => {
        const validateResult = validation(data);
        setErrorList(validateResult);
        if (_.isEqual(validateResult, {})) {
            const response: any = await axiosClient
                .post("/api/user/register", {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    fullName: data.fullName,
                })
                .catch((error) => {
                    // const message = error.response?.data.detail.message;
                    const data = error.response?.data;

                    if (data) {
                        const message = data.detail.message;
                        const responseData = data.data;
                        let duplicateError: duplicateError = {};
                        if (message) {
                            if (responseData[0].username === true)
                                duplicateError.username =
                                    "The username is already existed";

                            if (responseData[0].email === true)
                                duplicateError.email =
                                    "The email is already existed";
                            setErrorList({
                                ...errorList,
                                ...duplicateError,
                            });
                        } else {
                            toast.warning(
                                "There something wrong during connect to server!"
                            );
                        }
                    }
                });
            if (response) {
                toast.success("Register success!");
                history.push("/user/login");
            }
        }
        setLoading(false);
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
                    error={errorList?.email ? true : false}
                    helperText={errorList?.email}
                    {...register("email")}
                />
                <TextField
                    id="fullName"
                    label="Full name"
                    variant="standard"
                    className="mb-5"
                    fullWidth
                    error={errorList?.fullName ? true : false}
                    helperText={errorList?.fullName}
                    {...register("fullName")}
                />
                <TextField
                    id="username"
                    label="Username"
                    variant="standard"
                    className="mb-5"
                    fullWidth
                    error={errorList?.username ? true : false}
                    helperText={errorList?.username}
                    {...register("username")}
                />
                <TextField
                    id="password"
                    fullWidth
                    label="Password"
                    variant="standard"
                    className="mb-5"
                    error={errorList?.password ? true : false}
                    helperText={errorList?.password}
                    type="password"
                    {...register("password")}
                />
                <TextField
                    id="confirmPassword"
                    fullWidth
                    label="Confirm password"
                    variant="standard"
                    className="mb-5"
                    type="password"
                    error={errorList?.confirmPassword ? true : false}
                    helperText={errorList?.confirmPassword}
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
