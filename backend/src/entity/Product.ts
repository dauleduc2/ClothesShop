import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { IsDate } from "class-validator";
import { Size } from "./Size";
import { Type } from "./Type";
import { Color } from "./Color";
import { Image } from "./Image";
//product model

export type productStatus = "UNAVAILABLE" | "AVAILABLE";
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({ unique: true })
    name: string;

    @Column()
    productAvatar: string;

    @Column()
    quantity: number;

    @Column({ length: 1020 })
    description: string;

    @Column()
    price: number;

    @Column({
        type: "enum",
        enum: ["UNAVAILABLE", "AVAILABLE"],
    })
    status: productStatus;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;

    @ManyToMany((type) => Size)
    @JoinTable()
    sizes: Size[];

    @ManyToMany((type) => Type)
    @JoinTable()
    types: Type[];

    @ManyToMany((type) => Color)
    @JoinTable()
    colors: Color[];

    @ManyToMany((type) => Image, { cascade: true })
    @JoinTable()
    images: Image[];
}
