import * as Joi from "joi";
import { Type } from "../entity/Type";

const TypeSchema = Joi.object<Type>({
    nameOfType: Joi.string().max(255),
    typeID: Joi.string().max(50),
});

export default TypeSchema;
