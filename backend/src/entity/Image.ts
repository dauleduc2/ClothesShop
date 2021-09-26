import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Image {
    @PrimaryGeneratedColumn("uuid")
    ID: string;

    @Column()
    imageLink: string;
}
