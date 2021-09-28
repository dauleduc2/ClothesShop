import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    name: string;
}
