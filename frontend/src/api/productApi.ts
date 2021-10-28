import axiosClient from '../axios/config';
import { ResponseWithCount, ServerResponse } from '../common/interfaces/Common/api';
import { AdminQuery } from '../common/interfaces/Common/query';
import { ProductAddFormDTO, ProductToShowDTO } from '../common/interfaces/DTO/productDTO';
import { Product, ProductStatus } from '../common/interfaces/Model/Product';
export const productApi = {
    getAllProduct: async () => {
        const url = '/api/product';
        return await axiosClient.get<ServerResponse<ProductToShowDTO[], null>>(url);
    },
    getSpecificProduct: async (productName: string) => {
        const url = `api/product/${productName.split(' ').join('-')}`;
        return await axiosClient.get<ServerResponse<Product[], null>>(url);
    },
    adminGetAllProduct: async ({ limit, page }: AdminQuery) => {
        const url = `/api/admin/product?limit=${limit}&page=${page}`;
        return await axiosClient.get<ServerResponse<ResponseWithCount<Product[]>, null>>(url);
    },
    addNewProduct: async (product: ProductAddFormDTO) => {
        const url = '/api/product';
        let form = new FormData();
        form.append('name', product.name);
        form.append('description', product.description);
        form.append('price', product.price.toString());
        form.append('productAvatar', product.productAvatar);
        form.append('quantity', product.quantity.toString());
        product.images.forEach((image) => {
            form.append('images', image);
        });
        for (let i = 0; i < product.colors.length; i++) {
            const color = product.colors[i];
            form.append(`colors[${i}]`, color.toString());
        }
        for (let i = 0; i < product.sizes.length; i++) {
            const size = product.sizes[i];
            form.append(`sizes[${i}]`, size.toString());
        }
        for (let i = 0; i < product.types.length; i++) {
            const type = product.types[i];
            form.append(`types[${i}]`, type.toString());
        }
        form.append('status', product.status);
        return await axiosClient.post<ServerResponse<Product, null>>(url, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
