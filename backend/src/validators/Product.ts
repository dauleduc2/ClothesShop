import * as Joi from "joi";
import { Product } from "../entity/Product";

const ProductSchema = Joi.object<Product>({
    productID: Joi.string().max(50).required(),
    name: Joi.string().max(255).required(),
    amount: Joi.number().required(),
    description: Joi.string().max(1020).required(),
    price: Joi.number().required(),
    status: Joi.number().max(50).required(),
    createDate: Joi.date().required(),
});

export default ProductSchema;
