import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne((type) => Product, (product) => product, { nullable: false })
    product: Product;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column()
    @ManyToOne((type) => Color, (color) => color.ID)
    color: string;

    @Column()
    @ManyToOne((type) => Size, (size) => size.ID)
    size: string;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
