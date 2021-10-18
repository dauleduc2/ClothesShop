import axiosClient from '../axios/config';
import { ServerResponse } from '../common/interfaces/api';
import { LoginUserDTO, RegisterUserDTO } from '../common/interfaces/form';
import { User } from '../common/interfaces/user';

export const userApi = {
    getCurrentUser: async () => {
        const url = '/api/user/me';
        const res = await axiosClient.get<ServerResponse<User>>(url);
        return res;
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
        const res = await axiosClient.post<ServerResponse<User>>(url, form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return res;
    },
    logout: async () => {
        const url = '/api/user/me/logout';
        const res = await axiosClient.get(url);
        return res;
    },
    loginUser: async (input: LoginUserDTO) => {
        const url = '/api/user/login';
        return await axiosClient.post<ServerResponse<any>>(url, input);
    },
    registerUser: async (input: RegisterUserDTO) => {
        const url = '/api/user/register';
        return await axiosClient.post<ServerResponse<any>>(url, input);
    },
};
