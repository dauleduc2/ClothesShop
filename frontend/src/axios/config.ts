import axios, { AxiosInstance } from "axios";
import database from "../consts/database";

const axiosClient: AxiosInstance = axios.create({
    baseURL: database,
    withCredentials: true,
});

export default axiosClient;
