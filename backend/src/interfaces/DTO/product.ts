import { productStatus } from "../../entity/Product";

export interface AddProductInfoDTO {
    name: string;
    quantity: number;
    description: string;
    price: number;
    status: productStatus;
    sizes: number[];
    types: number[];
    colors: number[];
}
