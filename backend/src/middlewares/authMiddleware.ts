import { NextFunction, Response } from "express";
import RequestWithUser from "../interfaces/requestWithUser";

const helper = require("../utils/dataHelper");
const jwt = require("jsonwebtoken");
export function authMiddleware(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies["x-auth-token"];
    if (!token)
        return res
            .status(401)
            .send(helper.getResponseForm(null, "No token in cookie"));

    try {
        const data = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = data;
        next();
    } catch (error) {
        return res.status(400).send("Invalid token");
    }
}
