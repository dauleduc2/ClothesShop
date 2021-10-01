import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/config/config";
import { useEffect } from "react";
import axiosClient from "../../../axios/config";
import { userListAction } from "../../../redux/reducers/user";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
interface AutoLoginWrapperProps {}

const AutoLoginWrapper: React.FunctionComponent<AutoLoginWrapperProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    const getCurrentUser = async () => {
        try {
            const res: AxiosResponse = await axiosClient.get("/api/user/me");
            dispatch(
                userListAction.setUser({
                    ...res.data.data[0],
                })
            );
        } catch (error: any) {
            toast.warn(error.response?.data.detail.message);
        }
    };
    useEffect(() => {
        if (isLogin) {
            getCurrentUser();
        }
    }, [isLogin]);
    return <div>{children}</div>;
};

export default AutoLoginWrapper;
