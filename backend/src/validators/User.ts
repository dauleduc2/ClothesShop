import { User } from "./../entity/User";
import * as Joi from "joi";
import { JoiPassword } from "joi-password";
const UserSchema = Joi.object<User>({
    ID: Joi.string().max(50),
    username: Joi.string().max(255).required(),
    password: JoiPassword.string().noWhiteSpaces().required(),
    fullName: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    userStatus: Joi.number().max(50).default(0),
    role: Joi.number().max(50).default(0),
    createDate: Joi.date().default(Date.now()),
    avatar: Joi.string(),
});

const validateUser = (user: User) => {
    return UserSchema.validate(user);
};

export default validateUser;
