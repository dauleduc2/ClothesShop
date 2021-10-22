import * as Joi from "joi";
import { JoiPassword } from "joi-password";
import {
    UpdateUserDTO,
    LoginUserDTO,
    RegisterUserDTO,
} from "../interfaces/DTO/user";
import {
    stringCustomConfirmPassword,
    stringCustomEmail,
    stringCustomMessage,
} from "./common/message";

const userSchema = Joi.object<RegisterUserDTO>({
    username: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages(stringCustomMessage),
    password: JoiPassword.string()
        .min(3)
        .noWhiteSpaces()
        .required()
        .messages(stringCustomMessage),
    confirmPassword: Joi.string()
        .min(3)
        .required()
        .valid(Joi.ref("password"))
        .messages(stringCustomConfirmPassword),
    fullName: Joi.string().max(255).required().messages(stringCustomMessage),
    email: Joi.string().email().max(255).required().messages(stringCustomEmail),
});

const updateUserSchema = Joi.object<UpdateUserDTO>({
    fullName: Joi.string().min(3).max(255).messages(stringCustomMessage),
    email: Joi.string().email().max(255).messages(stringCustomEmail),
    address: Joi.string().min(3).max(500).messages(stringCustomMessage),
    phoneNumber: Joi.string()
        .min(7)
        .max(15)
        .pattern(/^[0-9]+$/)
        .messages({
            ...stringCustomMessage,
            "string.min": "length should be less than 7 numbers",
            "string.max": "length should be less than 15 numbers",
            "string.pattern.base": "invalid phone number",
        }),
});

const userLoginSchema = Joi.object<LoginUserDTO>({
    username: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages(stringCustomMessage),
    password: JoiPassword.string()
        .min(3)
        .noWhiteSpaces()
        .required()
        .messages(stringCustomMessage),
});

export const validateUser = (user: RegisterUserDTO) => {
    return userSchema.validate(user, { abortEarly: false });
};

export const validateLoginUser = (user: LoginUserDTO) => {
    return userLoginSchema.validate(user, { abortEarly: false });
};

export const validateUpdateUser = (data: UpdateUserDTO) => {
    return updateUserSchema.validate(data, { abortEarly: false });
};
