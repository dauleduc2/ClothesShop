import { Request } from "express";

export interface AddColorInfoDTO extends Request {
    name: string;
    hexCode: string;
}
