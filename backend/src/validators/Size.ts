import * as Joi from "joi";
import { Size } from "../entity/Size";

const SizeSchema = Joi.object<Size>({
    sizeName: Joi.string().max(50),
    sizeID: Joi.string().max(50),
});

export default SizeSchema;
