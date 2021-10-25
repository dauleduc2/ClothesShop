import axiosClient from '../axios/config';
import { ServerResponse } from '../common/interfaces/api';
import { AdminQuery } from '../common/interfaces/Common/query';
import { ResponseWithCount } from '../common/interfaces/Common/response';
import { Product, ProductToShow } from '../common/interfaces/product';

export const productApi = {
    getAllProduct: async () => {
        const url = '/api/product';
        return await axiosClient.get<ServerResponse<ProductToShow[]>>(url);
    },
    getSpecificProduct: async (productName: string) => {
        const url = `api/product/${productName.split(' ').join('-')}`;
        return await axiosClient.get<ServerResponse<Product[]>>(url);
    },
    adminGetAllProduct: async ({ limit, page }: AdminQuery) => {
        const url = `/api/admin/product?limit=${limit}&page=${page}`;
        return await axiosClient.get<ServerResponse<ResponseWithCount<Product[]>>>(url);
    },
};
