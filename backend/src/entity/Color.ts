import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Color {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column()
    color: string;
}
