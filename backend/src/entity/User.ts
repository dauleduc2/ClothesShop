import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsDate, IsEmail } from "class-validator";

//User model
export type userRole = 0 | 1;
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

    @Column({
        type: "enum",
        enum: [0, 1],
        default: 0,
    })
    userStatus: userStatus;

    @Column({
        type: "enum",
        enum: [0, 1],
        default: 0,
    })
    role: userRole;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    @IsDate()
    createDate: Date;
}
