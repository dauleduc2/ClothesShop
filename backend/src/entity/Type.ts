import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//type model
@Entity()
export class Type {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column()
    name: string;
}
