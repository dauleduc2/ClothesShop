import { Entity, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Size } from "./Size";
//size model
@Entity()
export class ProductImage {
    @ManyToOne((type) => Size, (type) => type.sizeID)
    sizeID: string; //???

    @ManyToOne((type) => Product, (product) => product.productID)
    productID: string; //???
}
