import * as Joi from "joi";
import { Image } from "../entity/Image";

const imageSchema = Joi.object<Image>({
    imageLink: Joi.string().max(1020),
});

const validateImage = (ImageData: Image) => {
    return imageSchema.validate(ImageData, { abortEarly: false });
};

export default validateImage;
