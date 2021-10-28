import { EntityRepository, Repository } from "typeorm";
import { Color } from "../entity/Color";
@EntityRepository(Color)
export class ColorRepository extends Repository<Color> {
    async addNewColor(color: Color) {
        //save to db
        const result = await this.manager
            .save(color)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async findByName(name: string) {
        const colorName = await this.findOne({ name });
        return colorName;
    }

    async findByID(ID: number) {
        const colorName = await this.findOne({ ID });
        return colorName;
    }

    async findByHexCode(hexCode: string) {
        const colorName = await this.findOne({ hexCode });
        return colorName;
    }

    async getAllColor() {
        const result = await this.find({});
        return result;
    }

    async removeByID(ID: number) {
        const result = await this.delete({ ID });
        console.log(result);
        return result;
    }
}
