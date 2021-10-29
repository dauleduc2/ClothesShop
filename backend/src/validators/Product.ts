import * as Joi from "joi";
import { Product } from "../entity/Product";

const productSchema = Joi.object<Product>({
    name: Joi.string().max(255).required(),
    price: Joi.number(),
    quantity: Joi.number().required(),
    description: Joi.string().required(),
    status: Joi.string().valid("UNAVAILABLE", "AVAILABLE").required(),
    sizes: Joi.array().items(Joi.string()),
    colors: Joi.array().items(Joi.string()),
    types: Joi.array().items(Joi.string()),
    images: Joi.array().items(Joi.string()),
    productAvatar: Joi.string().required(),
});

const validateProduct = (product: Product) => {
    return productSchema.validate(product, { abortEarly: false });
};

export default validateProduct;
