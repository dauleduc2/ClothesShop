import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsDate, IsEmail } from "class-validator";
import { OrderList } from "./OrderList";

//User model
export type userRole = "CUSTOMER" | "ADMIN";
export type userStatus = 0 | 1;
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column({
        unique: true,
    })
    username: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({
        nullable: true,
    })
    avatar: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column({
        type: "enum",
        enum: [0, 1],
        default: 0,
    })
    userStatus: userStatus;

    @Column({
        type: "enum",
        enum: ["CUSTOMER", "ADMIN"],
        default: "CUSTOMER",
    })
    role: userRole;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;

    @OneToMany((type) => OrderList, (orderList) => orderList.user)
    orderList: OrderList[];
}
