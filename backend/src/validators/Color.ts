import * as Joi from "joi";
import { Color } from "../entity/Color";

const colorSchema = Joi.object<Color>({
    name: Joi.string().max(50).required(),
    hexCode: Joi.string().max(20).required(),
});

const validateColor = (color: Color) => {
    return colorSchema.validate(color, { abortEarly: false });
};
export default validateColor;
