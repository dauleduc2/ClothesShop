import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
export const genToken = async (user: User) => {
    const token = jwt.sign(
        {
            ID: user.ID,
            role: user.role,
            // email: user.email,
            // fullName: user.fullName,
            // avatar: user.avatar,
            // userStatus: user.userStatus,
            // createDate: user.createDate,
            // username: user.username,
        },
        process.env.JWTSECRETKEY
    );
    return token;
};
