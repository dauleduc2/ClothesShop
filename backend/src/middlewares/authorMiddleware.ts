import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/common/Request";
import * as dataHelper from "../utils/dataHelper";
export function authorMiddleware(
    req: RequestWithUser<any>,
    res: Response,
    next: NextFunction
) {
    const { role } = req.user;
    if (role === 1) {
        next();
    } else {
        res.status(401).send(
            dataHelper.getResponseForm(
                null,
                null,
                "You need permission to access to this action!"
            )
        );
    }
}
