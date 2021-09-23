import { Entity, ManyToOne } from "typeorm";
import { Color } from "./Color";
import { Product } from "./Product";
//size model
@Entity()
export class ProductColor {
    @ManyToOne((type) => Color, (type) => type.colorID)
    colorID: string; //???

    @ManyToOne((type) => Product, (product) => product.productID)
    productID: string;
}
