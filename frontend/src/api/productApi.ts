import axiosClient from '../axios/config';
import { ServerResponse } from '../common/interfaces/api';
import { Product, ProductToShow } from '../common/interfaces/product';

export const productApi = {
    getAllProdct: async () => {
        const url = '/api/product';
        return await axiosClient.get<ServerResponse<ProductToShow[]>>(url);
    },
    getSpecificProduct: async (productName: string) => {
        const url = `api/product/${productName.split(' ').join('-')}`;
        return await axiosClient.get<ServerResponse<Product[]>>(url);
    },
};
