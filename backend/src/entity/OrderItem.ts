import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { IsDate } from "class-validator";
import { OrderList } from "./OrderList";
import { Product } from "./Product";
import { Color } from "./Color";
import { Size } from "./Size";
//product model
@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @ManyToOne((type) => OrderList, (orderList) => orderList.orderItem, {
        nullable: false,
    })
    order: OrderList;

    @ManyToOne((type) => Product, (product) => product.orderItem, {
        nullable: false,
    })
    product: Product;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    @ManyToOne((type) => Color, (color) => color)
    color: String;

    @Column()
    @ManyToOne((type) => Size, (size) => size)
    size: String;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
