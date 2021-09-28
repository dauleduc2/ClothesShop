import { EntityRepository, Repository } from "typeorm";
import { Type } from "../entity/Type";
@EntityRepository(Type)
export class TypeRepository extends Repository<Type> {
    async addNewType(type: Type) {
        //save to db
        const result = await this.manager
            .save(type)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async findByName(name: string) {
        const type = await this.findOne({ name });
        return type;
    }

    async findByID(ID: number) {
        const type = await this.findOne({ ID });
        return type;
    }

    async getAllType() {
        const result = await this.find({});
        return result;
    }
}
