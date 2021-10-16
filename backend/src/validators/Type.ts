import * as Joi from "joi";
import { Type } from "../entity/Type";

const typeSchema = Joi.object<Type>({
    name: Joi.string().max(255).required(),
});

const validateType = (type: Type) => {
    return typeSchema.validate(type, { abortEarly: false });
};

export default validateType;
