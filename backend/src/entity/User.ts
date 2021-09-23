import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDate, IsEmail } from "class-validator";

//User model
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userID: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column("tinyint")
    userStatus: number;

    @Column("tinyint")
    role: number;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
