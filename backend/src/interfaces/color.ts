import { Request } from "express";

export interface RequestWithColor extends Request {
    body: {
        name: string;
        hexCode: string;
    };
}
