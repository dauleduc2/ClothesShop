import { Entity, ManyToOne } from "typeorm";
import { Image } from "./Image";
import { Product } from "./Product";
//size model
@Entity()
export class ProductImage {
    @ManyToOne((type) => Image, (type) => type.imageID)
    imageID: string; //???

    @ManyToOne((type) => Product, (product) => product.productID)
    productID: string; //???
}
