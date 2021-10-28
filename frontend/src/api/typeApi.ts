import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { Type } from '../common/interfaces/Model/Type';
import { AddTypeDTO } from '../common/interfaces/DTO/typeDTO';

export const typeApi = {
    adminGetAllType: async () => {
        const url = '/api/type';
        return await axiosClient.get<ServerResponse<Type[], null>>(url);
    },
    adminAddNewType: async (newType: AddTypeDTO) => {
        const url = '/api/type';
        return await axiosClient.post<ServerResponse<Type, null>>(url, newType);
    },
};
