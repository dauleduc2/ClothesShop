import { User } from "./../entity/User";
import * as Joi from "joi";
import { JoiPassword } from "joi-password";
import { BodyUpdateUserDTO } from "../interfaces/DTO/user";
const userSchema = Joi.object<User>({
    username: Joi.string().max(255).required(),
    password: JoiPassword.string().noWhiteSpaces().required(),
    fullName: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    userStatus: Joi.number().valid(0, 1).max(50).default(0),
    role: Joi.number().valid(0, 1).max(50).default(0),
});

const updateUserSchema = Joi.object<User>({
    fullName: Joi.string().min(3).max(255),
    email: Joi.string().email().min(4).max(255),
    avatar: Joi.any(),
});

export const validateUser = (user: User) => {
    return userSchema.validate(user, { abortEarly: false });
};

export const validateUpdateUser = (data: BodyUpdateUserDTO) => {
    return updateUserSchema.validate(data, { abortEarly: false });
};
