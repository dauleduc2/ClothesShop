import axios, { AxiosError, AxiosInstance } from 'axios';
import { ServerResponse } from '../common/interfaces/api';

const axiosClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
});

// const onResponseSuccess = () => {};
// const onResponseReject = (error: AxiosError<ServerResponse<any>>) => {
//     // return Promise.reject(error)
//     if (error.response) {
//         return parseError(error.response.data);
//     } else {
//         return Promise.reject(error);
//     }
// };
// axiosClient.interceptors.response.use(onResponseSuccess, onResponseReject);

export default axiosClient;
