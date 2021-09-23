import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm";
import { IsDate } from "class-validator";
//product model
@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productID: string;

    @Column()
    name: string;

    @Column()
    amount: number;

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
}
