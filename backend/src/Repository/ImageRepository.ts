import { EntityRepository, Repository } from "typeorm";
import { Image } from "../entity/Image";
@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
    async addNewImage(image: Image) {
        //save to db
        const result = await this.manager
            .save(image)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async findByID(ID: string) {
        const image = await this.findOne({ ID });
        return image;
    }
}
