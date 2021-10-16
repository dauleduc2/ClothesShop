import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { IsDate } from "class-validator";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
//product model
export type OrderListStatus = 0 | 1 | 2 | 3;
@Entity()
export class OrderList {
    @ManyToOne((type) => User, (user) => user.ID, { nullable: false })
    user: string;

    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({
        type: "enum",
        enum: [0, 1, 2, 3],
        default: 0,
    })
    status: OrderListStatus;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, {
        cascade: true,
    })
    orderItem: OrderItem[];
}
