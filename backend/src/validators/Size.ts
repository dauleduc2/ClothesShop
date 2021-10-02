import * as Joi from "joi";
import { Size } from "../entity/Size";

const SizeSchema = Joi.object<Size>({
    name: Joi.string().max(50).required(),
    ID: Joi.number().max(50),
});

const validateSize = (size: Size) => {
    return SizeSchema.validate(size, { abortEarly: false });
};

export default validateSize;
