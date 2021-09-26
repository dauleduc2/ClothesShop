import { Request } from "express";
import { User } from "../entity/User";

interface RequestWithUser extends Request {
    user: User;
}

export default RequestWithUser;
