import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Color {
    @PrimaryGeneratedColumn("uuid")
    colorID: string;

    @Column()
    color: string;
}
