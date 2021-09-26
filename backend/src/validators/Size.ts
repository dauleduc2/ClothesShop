import * as Joi from "joi";
import { Size } from "../entity/Size";

const SizeSchema = Joi.object<Size>({
    name: Joi.string().max(50),
    ID: Joi.string().max(50),
});

export default SizeSchema;
