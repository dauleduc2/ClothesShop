import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { AdminQueryPage } from "../interfaces/common/Query";
import { ResponseDataWithCount } from "../interfaces/common/Request";
import { ProductToShowDTO } from "../interfaces/DTO/product";
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async addNewProduct(product: Product) {
        //save to db
        const result = await this.manager
            .save(product)
            .catch((err) => err.sqlMessage);
        return result;
    }

    async getAllProductToShow({
        limit,
        page,
    }: AdminQueryPage): Promise<ResponseDataWithCount<ProductToShowDTO[]>> {
        let result = (await this.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
        }).catch((err) => err)) as [Product[], number];
        const productList = result[0].map((product) => {
            return {
                ID: product.ID,
                name: product.name,
                productAvatar: product.productAvatar,
                price: product.price,
                status: product.status,
            };
        }) as ProductToShowDTO[];
        return {
            data: productList,
            count: result[1],
        };
    }

    async adminGetAllProduct({
        limit,
        page,
    }: AdminQueryPage): Promise<ResponseDataWithCount<Product[]>> {
        let result = await this.findAndCount({
            relations: ["images", "sizes", "types", "colors"],
            order: {
                createDate: "DESC",
            },
            take: limit,
            skip: (page - 1) * limit,
        });
        return {
            data: result[0],
            count: result[1],
        };
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
