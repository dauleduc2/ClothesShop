import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { Type } from '../common/interfaces/Model/Type';

export const typeApi = {
    adminGetAllType: async () => {
        const url = '/api/type';
        return await axiosClient.get<ServerResponse<Type[], null>>(url);
    },
};
