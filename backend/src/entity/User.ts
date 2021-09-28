import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDate, IsEmail } from "class-validator";

//User model
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

    @Column()
    avatar: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column({
        type: "tinyint",
        default: 0,
    })
    userStatus: number;

    @Column({
        type: "tinyint",
        default: 0,
    })
    role: number;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
