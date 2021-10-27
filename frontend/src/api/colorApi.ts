import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { Color } from '../common/interfaces/Model/Color';

export const colorApi = {
    adminGetAllColor: async () => {
        const url = '/api/color';
        return await axiosClient.get<ServerResponse<Color[], null>>(url);
    },
};
