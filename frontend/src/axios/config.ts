import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

export default axiosClient;
