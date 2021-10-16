import { NextFunction, Request, Response } from "express";
import * as statusCode from "../constants/statusConstants";
import multer = require("multer");

export function multerErrorMiddleware(multerAction: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        multerAction(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res
                    .status(statusCode.BAD_REQUEST)
                    .send(Buffer.from(err.message));
            } else if (err) {
                return res.status(statusCode.BAD_REQUEST).send(err);
            }
            next();
        });
    };
}
