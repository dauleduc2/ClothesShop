import { NextFunction, Request, Response } from "express";
import multer = require("multer");
import upload from "../utils/multerHelper";

export const multerErrorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const handling = upload.array("images", 5);

    handling(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(418).send(Buffer.from(err.message));
        } else if (err) {
            return res.status(400).send("Something failed");
        }
        next();
    });
};
