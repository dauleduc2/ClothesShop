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

    async getAllProductToShow() {
        let result = await this.find({}).catch((err) => err);
        result = result.map((product) => {
            return {
                ID: product.ID,
                name: product.name,
                productAvatar: product.productAvatar,
                price: product.price,
                status: product.status,
            };
        });
        return result;
    }

    async findByName(name: string) {
        const product = await this.find({
            where: {
                name,
            },
            relations: ["images", "sizes", "types", "colors"],
        }).catch((err) => err);
        return product;
    }

    async findByID(ID: string) {
        const product: Product = await this.findOne({ ID }).catch((err) => err);
        return product;
    }
}
