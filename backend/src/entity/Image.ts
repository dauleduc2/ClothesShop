import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Image {
    @PrimaryGeneratedColumn("uuid")
    imageID: string;

    @Column()
    imageLink: string;
}
