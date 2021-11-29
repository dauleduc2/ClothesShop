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
    async findProductIdByTypeName(name: string) {
        const productList = await this.query(`
                                    SELECT pt.productID 
                                    FROM type t
                                    JOIN product_types_type pt
                                        ON pt.typeID = t.ID
                                    WHERE t.name = '${name}'`);
        return productList;
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

    async removeTypeByID(ID: number) {
        const result = await this.delete({ ID });
        return result;
    }
}
