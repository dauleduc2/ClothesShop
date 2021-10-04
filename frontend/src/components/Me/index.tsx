import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface MePageProps {}

interface updateField {
    fullname: string;
    email: string;
    avatar: any;
}

const MePage: React.FunctionComponent<MePageProps> = () => {
    const userInfo = {
        username: "kainesv86",
        fullname: "Kainé Phạm",
        email: "kainesv86@gmail.com",
        createDate: "19-11-2001",
        avatarUrl: "/images/avatar.png",
    };

    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);

    const { handleSubmit, register, watch } = useForm<updateField>({
        defaultValues: {
            email: userInfo.email,
            fullname: userInfo.fullname,
            avatar: null,
        },
        reValidateMode: "onChange",
    });

    const [fileImage, setFileImage] = React.useState<any>(userInfo.avatarUrl);
    const onSubmit = (data: updateField) => {
        if (data.avatar[0]) {
            setFileImage(URL.createObjectURL(data.avatar[0]));
        }
        console.log(data);
        toast.success("Login success!");
        // setIsSubmit(true);
        // setTimeout(() => setIsSubmit(false), 5000);
    };

    const image = watch("avatar");

    React.useEffect(() => {
        if (image && image.length > 0) {
            setFileImage(URL.createObjectURL(image[0]));
        }
    }, [image]);

    return (
        <form
            className="flex justify-center w-full shadow-md sm:w-auto sm:items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className={`absolute sm:top-10 sm:right-10 top-2 right-2 ${
                    isSubmit ? "block" : "hidden"
                }`}
            >
                {/* <Alert
                    variant="filled"
                    severity="success"
                    className={`sm:w-120 w-44`}
                >
                    Update successful
                </Alert> */}
            </div>
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
                                        Fullname
                                    </p>
                                    <Input
                                        placeholder="Fullname"
                                        size="medium"
                                        className="flex-1 w-full text-xl font-medium"
                                        {...register("fullname")}
                                    />
                                </div>
                            </li>
                            <li className="flex mb-5 sm:mb-10 ">
                                <div className="flex flex-col w-full text-xl font-medium sm:flex-row">
                                    <p className="w-32 mr-4 text-left text-blue-900 sm:text-right">
                                        Email
                                    </p>
                                    <Input
                                        placeholder="Email"
                                        size="medium"
                                        className="flex-1 w-full text-xl font-medium"
                                        {...register("email")}
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
                                        alt={userInfo.username}
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
    );
};

export default MePage;
