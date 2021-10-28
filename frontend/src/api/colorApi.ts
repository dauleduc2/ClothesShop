import { ServerResponse } from '../common/interfaces/Common/api';
import axiosClient from '../axios/config';
import { Color } from '../common/interfaces/Model/Color';
import { AddColorDTO } from '../common/interfaces/DTO/colorDTO';

export const colorApi = {
    adminGetAllColor: async () => {
        const url = '/api/color';
        return await axiosClient.get<ServerResponse<Color[], null>>(url);
    },
    adminAddNewColor: async (newColor: AddColorDTO) => {
        const url = '/api/color';
        return await axiosClient.post<ServerResponse<Color, null>>(url, newColor);
    },
};
