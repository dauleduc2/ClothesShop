import { User } from "./../entity/User";
import * as Joi from "joi";
import { JoiPassword } from "joi-password";
import { BodyUpdateUser } from "../interfaces/user";
const UserSchema = Joi.object<User>({
    username: Joi.string().max(255).required(),
    password: JoiPassword.string().noWhiteSpaces().required(),
    fullName: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    userStatus: Joi.number().max(50).default(0),
    role: Joi.number().max(50).default(0),
});

const UpdateUserSchema = Joi.object<User>({
    fullName: Joi.string().min(3).max(255),
    email: Joi.string().email().min(4).max(255),
    avatar: Joi.any(),
});

export const validateUser = (user: User) => {
    return UserSchema.validate(user, { abortEarly: false });
};

export const validateUpdateUser = (data: BodyUpdateUser) => {
    return UpdateUserSchema.validate(data, { abortEarly: false });
};
