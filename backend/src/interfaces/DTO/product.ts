import { Product } from "../../entity/Product";
import { DateProps } from "../common/dateTime";

export interface AddProductInfoDTO
    extends Pick<
        Product,
        "name" | "quantity" | "description" | "price" | "status"
    > {
    sizes: number[];
    types: number[];
    colors: number[];
}

export interface ProductToShowDTO
    extends Pick<
        Product,
        "ID" | "name" | "productAvatar" | "price" | "status"
    > {}

export interface ProductAnalyst extends DateProps {}
