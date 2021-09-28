import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//type model
@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({
        unique: true,
    })
    name: string;
}
