import * as Joi from "joi";
import { Color } from "../entity/Color";

const ColorSchema = Joi.object<Color>({
    color: Joi.string().max(50),
    ID: Joi.string().max(50),
});
export default ColorSchema;
