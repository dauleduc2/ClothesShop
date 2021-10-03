import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from "class-validator";
import { OrderList } from "./OrderList";
import { Product } from "./Product";
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

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
