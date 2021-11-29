import { Product } from "../../entity/Product";
import { Type } from "../../entity/Type";
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

export interface UpdateProductDTO extends Partial<Omit<Product, "ID">> {}

export interface ProductToShowDTO
    extends Pick<
        Product,
        "ID" | "name" | "productAvatar" | "price" | "status"
    > {}

export interface ProductAnalyst extends DateProps {}

export interface GetEachProductAnalyst extends DateProps {
    ID: string;
}

export interface GetProductByTypeDTO {
    name: string;
}
