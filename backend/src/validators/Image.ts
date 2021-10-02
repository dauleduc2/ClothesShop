import * as Joi from "joi";
import { Image } from "../entity/Image";

const ImageSchema = Joi.object<Image>({
    imageLink: Joi.string().max(1020),
    ID: Joi.string().max(50),
});

const validateImage = (ImageData: Image) => {
    return ImageSchema.validate(ImageData, { abortEarly: false });
};

export default validateImage;
