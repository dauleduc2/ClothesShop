import { Entity, Column, Double, ManyToOne } from "typeorm";
import { IsDate } from "class-validator";
import { OrderList } from "./OrderList";
import { Product } from "./Product";
//product model
@Entity()
export class OrderItem {
    @ManyToOne((type) => OrderList, (orderList) => orderList.orderID)
    orderID: string; //???

    @ManyToOne((type) => Product, (product) => product.productID)
    productID: string; //???

    @Column()
    amount: number;

    @Column()
    price: Double;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
