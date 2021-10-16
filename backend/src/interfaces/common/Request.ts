import { Request } from "express";
import { User } from "../../entity/User";

export interface ServerRequest<T> extends Request {
    body: T;
}

export interface RequestWithUser<T> extends Request {
    user: User;
    body: T;
}
