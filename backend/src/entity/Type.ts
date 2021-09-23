import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//type model
@Entity()
export class Type {
    @PrimaryGeneratedColumn("uuid")
    typeID: string;

    @Column()
    nameOfType: string;
}
