import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { useEffect } from "react";
import axiosClient from "../../../axios/config";
import { userListAction } from "../../../redux/reducers/user";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
interface AutoLoginWrapperProps {}

const AutoLoginWrapper: React.FunctionComponent<AutoLoginWrapperProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    const history = useHistory();
    const getCurrentUser = async () => {
        console.log("getting current information...");
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
        history.push("/");
    };
    useEffect(() => {
        console.log("effect....");
        if (isLogin) {
            getCurrentUser();
        }
    });
    return <div>{children}</div>;
};

export default AutoLoginWrapper;
