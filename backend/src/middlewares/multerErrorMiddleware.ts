import { NextFunction, Request, Response } from "express";
import multer = require("multer");

export function multerErrorMiddleware(multerAction: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        multerAction(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(418).send(Buffer.from(err.message));
            } else if (err) {
                return res.status(400).send("Something failed");
            }
            next();
        });
    };
}
