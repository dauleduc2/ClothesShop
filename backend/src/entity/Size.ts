import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Size {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column()
    name: string;
}
