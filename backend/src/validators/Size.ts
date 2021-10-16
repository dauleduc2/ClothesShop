import * as Joi from "joi";
import { Size } from "../entity/Size";

const sizeSchema = Joi.object<Size>({
    name: Joi.string().max(50).required(),
});

const validateSize = (size: Size) => {
    return sizeSchema.validate(size, { abortEarly: false });
};

export default validateSize;
