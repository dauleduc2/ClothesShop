import * as React from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as validateHelper from "../../utils/validateHelper";
import axiosClient from "../../axios/config";
import * as _ from "lodash";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userListAction } from "../../redux/user/user";
interface LoginProps {}
interface LoginField {
    username: string;
    password: string;
}
interface ErrorField extends Object {
    username?: string;
    password?: string;
}
const Login: React.FunctionComponent<LoginProps> = () => {
    const [loading, setLoading] = useState(false);
    const [errorList, setErrorList] = useState<ErrorField | undefined>(
        undefined
    );
    const { handleSubmit, register } = useForm<LoginField>();
    const history = useHistory();
    const dispatch = useDispatch();
    function handleClick() {
        document.getElementById("submitButton")?.click();
        setLoading(true);
    }

    //validation
    const validation = (data: LoginField): ErrorField => {
        let errorList: ErrorField = {};
        //username
        if (!validateHelper.length(data.username, 6, 255))
            errorList.username = "The number of character must between 6 - 255";
        if (!data.username) errorList.username = "Required";
        //password
        if (!validateHelper.length(data.password, 6, 255))
            errorList.password = "The number of character must between 6 - 255";
        if (!data.password) errorList.password = "Required";

        //return
        return errorList;
    };
    const onSubmit = async (data: LoginField) => {
        const validateResult = validation(data);
        setErrorList(validateResult);
        if (_.isEqual(validateResult, {})) {
            const response: any = await axiosClient
                .post("/api/user/login", {
                    username: data.username,
                    password: data.password,
                })
                .catch((error) => {
                    const message = error.response?.data.detail.message;
                    if (message) {
                        toast.warning(message);
                    } else {
                        toast.warning(
                            "There something wrong during connect to server!"
                        );
                    }
                });
            if (response) {
                dispatch(userListAction.setLogin(true));
                toast.success("Login success!");
                history.push("/user/me");
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
                    type="password"
                    error={errorList?.password ? true : false}
                    helperText={errorList?.password}
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
