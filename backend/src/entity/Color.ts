import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Color {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({
        unique: true,
    })
    name: string;

    @Column({
        unique: true,
    })
    hexCode: string;
}
