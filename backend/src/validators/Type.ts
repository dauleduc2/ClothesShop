import * as Joi from "joi";
import { Type } from "../entity/Type";

const TypeSchema = Joi.object<Type>({
    name: Joi.string().max(255).required(),
    ID: Joi.number().max(50),
});

const validateType = (type: Type) => {
    return TypeSchema.validate(type, { abortEarly: false });
};

export default validateType;
