import { NextFunction, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";
import * as dataHelper from "../utils/dataHelper";
const jwt = require("jsonwebtoken");
export function authenMiddleware(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies["x-auth-token"];
    if (!token)
        return res
            .status(401)
            .send(dataHelper.getResponseForm(null, null, "No token in cookie"));

    try {
        const data = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = data;
        next();
    } catch (error) {
        return res
            .status(400)
            .send(dataHelper.getResponseForm(null, null, "Invalid token"));
    }
}
