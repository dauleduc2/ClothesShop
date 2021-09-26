import * as Joi from "joi";
import { Type } from "../entity/Type";

const TypeSchema = Joi.object<Type>({
    name: Joi.string().max(255),
    ID: Joi.string().max(50),
});

export default TypeSchema;
