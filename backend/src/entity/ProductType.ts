import { Entity, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Type } from "./Type";
//size model
@Entity()
export class ProductType {
    @ManyToOne((type) => Type, (type) => type.typeID)
    typeID: string; //???

    @ManyToOne((type) => Product, (product) => product.productID)
    productID: string; //???
}
