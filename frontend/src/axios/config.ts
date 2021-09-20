import axios from "axios";
import database from "../consts/database";

const axiosClient = axios.create({
    baseURL: database,
    withCredentials: true,
});

export default axiosClient;
