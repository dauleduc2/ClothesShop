import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsDate } from "class-validator";
import { User } from "./User";
//product model
@Entity()
export class OrderList {
    @ManyToOne((type) => User, (user) => user.ID)
    user: string;

    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column("tinyint")
    status: string;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
