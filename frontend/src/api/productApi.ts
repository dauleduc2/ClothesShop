import axiosClient from '../axios/config';
import { ServerResponse } from '../common/interfaces/api';
import { ProductToShow } from '../common/interfaces/product';

export const productApi = {
    getAllProdct: async () => {
        const url = '/api/product';
        const res = await axiosClient.get<ServerResponse<ProductToShow[]>>(url);
        return res;
    },
};
