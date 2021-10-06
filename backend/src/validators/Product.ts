import * as Joi from "joi";
import { Product } from "../entity/Product";

const ProductSchema = Joi.object<Product>({
    ID: Joi.string().max(50),
    name: Joi.string().max(255).required(),
    price: Joi.number(),
    quantity: Joi.number().required(),
    description: Joi.string().max(1020).required(),
    status: Joi.number().max(50).required(),
    createDate: Joi.date(),
    sizes: Joi.array().items(Joi.string()),
    colors: Joi.array().items(Joi.string()),
    types: Joi.array().items(Joi.string()),
    images: Joi.array().items(Joi.string()),
});

const validateProduct = (product: Product) => {
    return ProductSchema.validate(product, { abortEarly: false });
};

export default validateProduct;
