import axios, { AxiosInstance } from 'axios';
import * as urlLink from '../consts/url';
const axiosClient: AxiosInstance = axios.create({
    baseURL: urlLink.ENV_SERVER,
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
