import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Double,
    OneToMany,
} from "typeorm";
import { IsDate } from "class-validator";
import { Size } from "./Size";
import { Type } from "./Type";
import { Color } from "./Color";
import { Image } from "./Image";
//product model
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productID: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @Column()
    price: Double;

    @Column("tinyint")
    status: number;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;

    @OneToMany((type) => Size, (size) => size.sizeID)
    sizes: Size[];

    @OneToMany((type) => Type, (type) => type.typeID)
    types: Type[];

    @OneToMany((type) => Color, (color) => color.colorID)
    colors: Color[];

    @OneToMany((type) => Image, (image) => image.imageID)
    images: Image[];
}
