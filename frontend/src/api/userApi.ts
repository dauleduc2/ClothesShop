import axiosClient from '../axios/config';
import { ServerResponse } from '../common/interfaces/api';
import { ResponseWithCount } from '../common/interfaces/Common/response';
import { LoginUserDTO, RegisterUserDTO } from '../common/interfaces/form';
import { User } from '../common/interfaces/user';

export const userApi = {
    getCurrentUser: async () => {
        const url = '/api/user/me';
        return await axiosClient.get<ServerResponse<User>>(url);
    },
    updateUser: async (data: any) => {
        const url = '/api/user/me/update';
        let form = new FormData();
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key];
                form.append(key, element);
            }
            if (key === 'avatar') {
                const element = data[key];
                if (element === null) {
                    form.append(key, '');
                } else {
                    form.append(key, element[0]);
                }
            }
        }
        return await axiosClient.post<ServerResponse<User>>(url, form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    },
    logout: async () => {
        const url = '/api/user/me/logout';

        return await axiosClient.get(url);
    },
    loginUser: async (input: LoginUserDTO) => {
        const url = '/api/user/login';
        return await axiosClient.post<ServerResponse<any>>(url, input);
    },
    registerUser: async (input: RegisterUserDTO) => {
        const url = '/api/user/register';
        return await axiosClient.post<ServerResponse<any>>(url, input);
    },
    getAllUser: async (limit: number, page: number) => {
        const url = `/api/admin/user?limit=${limit}&page=${page}`;
        return await axiosClient.get<ServerResponse<ResponseWithCount<User[]>>>(url);
    },
};
