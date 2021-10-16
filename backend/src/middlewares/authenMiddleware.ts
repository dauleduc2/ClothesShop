import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/common/Request";
import * as dataHelper from "../utils/dataHelper";
import * as status from "../constants/statusConstants";
const jwt = require("jsonwebtoken");
export function authenMiddleware(
    req: RequestWithUser<any>,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies["x-auth-token"];
    if (!token)
        return res
            .status(status.UNAUTHORIZED)
            .send(dataHelper.getResponseForm(null, null, "No token in cookie"));

    try {
        const data = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = data;
        next();
    } catch (error) {
        return res
            .status(status.BAD_REQUEST)
            .send(dataHelper.getResponseForm(null, null, "Invalid token"));
    }
}
