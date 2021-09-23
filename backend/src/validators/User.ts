import * as Joi from "joi";
import { User } from "../entity/User";

const UserSchema = Joi.object<User>({
    userID: Joi.string().max(50).required(),
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    fullName: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    userStatus: Joi.number().max(50).required(),
    role: Joi.number().max(50).required(),
    createDate: Joi.date().required(),
});

export default UserSchema;
