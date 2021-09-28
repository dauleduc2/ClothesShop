import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity/Product";
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async addNewProduct(product: Product) {
        //save to db
        const result = await this.manager
            .save(product)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async findByName(name: string) {
        const product = await this.findOne({ name }).catch((err) => err);
        return product;
    }

    async findByID(ID: string) {
        const product = await this.findOne({ ID }).catch((err) => err);
        return product;
    }
}
