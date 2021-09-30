import * as Joi from "joi";
import { Image } from "../entity/Image";

const ImageSchema = Joi.object<Image>({
    imageLink: Joi.string().max(1020),
    ID: Joi.string().max(50),
});

export default ImageSchema;
