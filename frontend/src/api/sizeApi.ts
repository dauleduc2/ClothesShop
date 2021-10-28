import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { Size } from '../common/interfaces/Model/Size';
import { AddSizeDTO } from '../common/interfaces/DTO/sizeDTO';

export const sizeApi = {
    adminGetAllSize: async () => {
        const url = '/api/size';
        return await axiosClient.get<ServerResponse<Size[], null>>(url);
    },
    adminAddNewSize: async (newSize: AddSizeDTO) => {
        const url = '/api/size';
        return await axiosClient.post<ServerResponse<Size, null>>(url, newSize);
    },
    adminRemoveSize: async (ID: number) => {
        const url = `/api/size/${ID}`;
        return await axiosClient.get<ServerResponse<null, null>>(url);
    },
};
