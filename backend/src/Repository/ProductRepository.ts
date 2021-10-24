import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { adminQueryPage } from "../interfaces/common/Query";
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

    async adminGetAllProduct({ limit, page }: adminQueryPage) {
        let result = await this.find({});
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

    async checkQuantityOfProduct(ID: string, amount: number) {
        const currentProduct = await this.findOne({ ID });
        const currentQuantity = currentProduct.quantity;
        if (currentQuantity - amount < 0) {
            return Promise.reject(currentProduct.name);
        }
        return Promise.resolve();
    }

    async minusQuantityProduct(ID: string, amount: number) {
        const currentProduct = await this.findOne({ ID });
        const currentQuantity = currentProduct.quantity;
        if (currentQuantity - amount < 0) {
            return Promise.reject(
                `${currentProduct.name} is out of stock with this amount, please try again with lower amount`
            );
        }
        const finalQuantity = currentQuantity - amount;
        return await this.update({ ID }, { quantity: finalQuantity });
    }

    async addQuantityProduct(ID: string, amount: number) {
        const currentProduct = await this.findOne({ ID });
        const currentQuantity = currentProduct.quantity;
        return await this.update(
            { ID },
            { quantity: currentQuantity + amount }
        );
    }
}
