import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { useEffect } from "react";
import axiosClient from "../../../axios/config";
import { userListAction } from "../../../redux/user/user";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { userApi } from "../../../api/userApi";
import { userThunk } from "../../../redux/user/userThunk";
interface AutoLoginWrapperProps {}

const AutoLoginWrapper: React.FunctionComponent<AutoLoginWrapperProps> = ({
    children,
}) => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.user.isLogin);

    useEffect(() => {
        dispatch(userThunk.getCurrentUser());
    }, [isLogin, dispatch]);
    return <div>{children}</div>;
};

export default AutoLoginWrapper;
