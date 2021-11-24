import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
