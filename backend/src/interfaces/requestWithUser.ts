import { Request } from "express";
import { User } from "../entity/User";

export interface RequestWithUser extends Request {
    user: User;
}

export interface BodyUpdateUser {
    fullName?: string;
    avatar?: string;
    email?: string;
}

export interface RequestWithUpdateUser extends RequestWithUser {
    body: BodyUpdateUser;
}
