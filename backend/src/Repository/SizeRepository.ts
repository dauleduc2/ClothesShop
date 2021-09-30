import { EntityRepository, Repository } from "typeorm";
import { Size } from "../entity/Size";
@EntityRepository(Size)
export class SizeRepository extends Repository<Size> {
    async addNewSize(size: Size) {
        //save to db
        const result = await this.manager
            .save(size)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async findByName(name: string) {
        const size = await this.findOne({ name });
        return size;
    }

    async findByID(ID: number) {
        const size = await this.findOne({ ID });
        return size;
    }

    async getAllSize() {
        const result = await this.find({});
        return result;
    }
}
