import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Size {
    @PrimaryGeneratedColumn("uuid")
    sizeID: string;

    @Column()
    sizeName: string;
}
