import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import * as validateHelper from "../../utils/validateHelper";
import * as _ from "lodash";
import { TextField } from "@mui/material";

interface MeProps {}
interface UpdateField {
    fullName: string;
    email: string;
    avatar: any;
}

interface userData {
    username: string;
    fullName: string;
    email: string;
    createDate: Date | null | undefined;
    avatar: string;
}
interface ErrorField {
    email?: string;
    fullName?: string;
}
const Me: React.FunctionComponent<MeProps> = () => {
    const user = useSelector((state: RootState) => state.user);
    const userInfo: userData = {
        username: user.user.username ? user.user.username : "",
        fullName: user.user.fullName ? user.user.fullName : "",
        email: user.user.email ? user.user.email : "",
        createDate: user.user.createDate,
        avatar: user.user.avatar ? user.user.avatar : "/images/avatar.png",
    };
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
    const [errorList, setErrorList] = React.useState<ErrorField | undefined>(
        undefined
    );
    const [fileImage, setFileImage] = React.useState<any>(userInfo.avatar);

    const { handleSubmit, register, watch } = useForm<UpdateField>({
        reValidateMode: "onChange",
    });

    const image = watch("avatar");

    React.useEffect(() => {
        if (image && image.length > 0) {
            setFileImage(URL.createObjectURL(image[0]));
        }
    }, [image]);
    //validation
    const validation = (data: UpdateField): ErrorField => {
        let errorList: ErrorField = {};
        //fullName
        if (!validateHelper.length(data.fullName, 6, 255))
            errorList.fullName = "The number of character must between 6 - 255";
        if (!data.fullName) errorList.fullName = "Required";
        //email
        if (!validateHelper.length(data.email, 6, 255))
            errorList.email = "The number of character must between 6 - 255";
        if (!data.email) errorList.email = "Required";

        return errorList;
    };
    //submit
    const onSubmit = (data: UpdateField) => {
        const validateResult = validation(data);
        setErrorList(validateResult);
        if (_.isEqual(validateResult, {})) {
        }
        if (data.avatar) {
            setFileImage(URL.createObjectURL(data.avatar[0]));
            toast.success("Update success!");
        }
    };
    return (
        <div className="flex flex-col items-center w-full overflow-y-auto bg-gray-100 sm:bg-sky-800 sm:justify-center h-contentHeight">
            <form
                className="flex justify-center w-full shadow-md sm:w-auto sm:items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    className={`absolute sm:top-10 sm:right-10 top-2 right-2 ${
                        isSubmit ? "block" : "hidden"
                    }`}
                ></div>
                <div className="flex flex-col w-full sm:w-auto">
                    <div className="p-5 mb-0 text-3xl font-semibold text-left bg-gray-100 rounded-t sm:p-10 sm:mb-4 text-sky-800">
                        <p>Information</p>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row">
                        <div className="flex w-full p-5 mr-0 bg-gray-100 rounded-bl sm:p-20 sm:mr-4 sm:w-180">
                            <ul className="w-full text-lg text-right text-gray-600">
                                <li className="mb-5 sm:mb-10">
                                    <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                        <p className="w-auto mr-4 text-left text-blue-900 sm:text-right sm:w-32">
                                            Username
                                        </p>
                                        <p className="w-auto text-left text-gray-800">
                                            {userInfo.username}
                                        </p>
                                    </div>
                                </li>
                                <li className="mb-5 sm:mb-10">
                                    <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                        <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">
                                            full name
                                        </p>
                                        <TextField
                                            {...register("fullName")}
                                            variant="standard"
                                            placeholder="fullName"
                                            autoComplete="false"
                                            size="medium"
                                            inputProps={{
                                                style: {
                                                    fontSize: "1.25rem",
                                                    lineHeight: "1.75rem",
                                                    fontWeight: 500,
                                                },
                                            }}
                                            className="flex-1 w-full text-xl font-medium"
                                            defaultValue={userInfo.fullName}
                                        />
                                    </div>
                                </li>
                                <li className="flex mb-5 sm:mb-10">
                                    <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                        <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">
                                            Email
                                        </p>
                                        <TextField
                                            {...register("email")}
                                            variant="standard"
                                            placeholder="Email"
                                            size="medium"
                                            autoComplete="false"
                                            inputProps={{
                                                style: {
                                                    fontSize: "1.25rem",
                                                    lineHeight: "1.75rem",
                                                    fontWeight: 500,
                                                },
                                            }}
                                            className="flex-1 w-full text-xl font-medium"
                                            defaultValue={userInfo.email}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="flex flex-col text-xl font-medium sm:flex-row">
                                        <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">
                                            Create Date
                                        </p>
                                        <p className="w-auto text-left text-gray-800">
                                            {userInfo.createDate}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center justify-center p-10 bg-gray-100 rounded-br sm:p-20">
                            <div className="sm:mb-8">
                                <div className="relative">
                                    <label
                                        htmlFor="raised-button-file"
                                        className="cursor-pointer"
                                    >
                                        <Avatar
                                            alt={
                                                userInfo.username
                                                    ? userInfo.username
                                                    : "avatar of user"
                                            }
                                            src={fileImage}
                                            sx={{ width: 160, height: 160 }}
                                        />
                                        <input
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            id="raised-button-file"
                                            multiple
                                            type="file"
                                            {...register("avatar")}
                                        />
                                    </label>
                                </div>
                            </div>
                            <Button
                                size="large"
                                type="submit"
                                className="hidden sm:block"
                            >
                                Update information
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col h-auto mt-4 bg-gray-100 sm:hidden">
                        <Button size="large" type="submit">
                            Update information
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Me;
