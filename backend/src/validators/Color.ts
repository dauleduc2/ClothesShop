import * as Joi from "joi";
import { Color } from "../entity/Color";

const ColorSchema = Joi.object<Color>({
    name: Joi.string().max(50).required(),
    ID: Joi.number().max(50),
});

const validateColor = (color: Color) => {
    return ColorSchema.validate(color, { abortEarly: false });
};
export default validateColor;
