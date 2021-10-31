import axiosClient from '../axios/config';
import { ResponseWithCount, ServerResponse } from '../common/interfaces/Common/api';
import { AdminQuery } from '../common/interfaces/Common/query';
import { ProductAddFormDTO, ProductToShowDTO, UpdateProductDTO } from '../common/interfaces/DTO/productDTO';
import { Product } from '../common/interfaces/Model/Product';

export const productApi = {
    getAllProduct: async ({ limit, page }: AdminQuery) => {
        const url = `/api/product?limit=${limit}&page=${page}`;
        return await axiosClient.get<ServerResponse<ResponseWithCount<ProductToShowDTO[]>, null>>(url);
    },
    getSpecificProduct: async (productName: string) => {
        const url = `/api/product/${productName.split(' ').join('-')}`;
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
        form.append('price', String(product.price));
        form.append('productAvatar', product.productAvatar);
        form.append('quantity', String(product.quantity));
        product.images.forEach((image) => {
            form.append('images', image);
        });
        for (let i = 0; i < product.colors.length; i++) {
            const color = product.colors[i];
            form.append(`colors[${i}]`, String(color));
        }
        for (let i = 0; i < product.sizes.length; i++) {
            const size = product.sizes[i];
            form.append(`sizes[${i}]`, String(size));
        }
        for (let i = 0; i < product.types.length; i++) {
            const type = product.types[i];
            form.append(`types[${i}]`, String(type));
        }
        form.append('status', product.status);
        return await axiosClient.post<ServerResponse<Product, null>>(url, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateProduct: async (updateProduct: UpdateProductDTO) => {
        const url = `/api/product/${updateProduct.ID}`;
        let form = new FormData();
        form.append('name', updateProduct.name);
        form.append('description', updateProduct.description);
        form.append('price', String(updateProduct.price));
        form.append('quantity', String(updateProduct.quantity));
        form.append('status', updateProduct.status);
        if (updateProduct.newProductAvatar) {
            form.append('newProductAvatar', updateProduct.newProductAvatar);
        } else {
            if (updateProduct.productAvatar) {
                form.append('productAvatar', updateProduct.productAvatar);
            }
        }
        if (updateProduct.newImages) {
            for (let i = 0; i < updateProduct.newImages.length; i++) {
                const image = updateProduct.newImages[i];
                form.append('newImages', image);
            }
        }

        if (updateProduct.images && updateProduct.images.length > 0) {
            updateProduct.images.forEach((image) => {
                form.append('images', image.toString());
            });
        }
        for (let i = 0; i < updateProduct.colors.length; i++) {
            const color = updateProduct.colors[i];
            form.append(`colors[${i}]`, color.toString());
        }
        for (let i = 0; i < updateProduct.sizes.length; i++) {
            const size = updateProduct.sizes[i];
            form.append(`sizes[${i}]`, size.toString());
        }
        for (let i = 0; i < updateProduct.types.length; i++) {
            const type = updateProduct.types[i];
            form.append(`types[${i}]`, type.toString());
        }

        return await axiosClient.post<ServerResponse<null, null>>(url, form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
