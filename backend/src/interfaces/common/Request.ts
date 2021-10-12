import { Request } from "express";

export interface ServerRequest<T> extends Request {
    body: T;
}
