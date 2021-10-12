import { Request } from "express";
import { User } from "../entity/User";

export interface RequestWithUser<T> extends Request {
    user: User;
    body: T;
}

export interface BodyUpdateUser {
    fullName?: string;
    avatar?: string;
    email?: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    fullName: string;
    username: string;
    role: number;
    password: string;
}
