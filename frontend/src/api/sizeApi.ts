import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { Size } from '../common/interfaces/Model/Size';

export const sizeApi = {
    adminGetAllSize: async () => {
        const url = '/api/size';
        return await axiosClient.get<ServerResponse<Size[], null>>(url);
    },
};
