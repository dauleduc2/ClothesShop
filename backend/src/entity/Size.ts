import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//size model
@Entity()
export class Size {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({
        unique: true,
    })
    name: string;
}
