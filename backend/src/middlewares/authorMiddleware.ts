import { NextFunction, Response } from "express";
import { RequestWithUser } from "../interfaces/common/Request";
import * as dataHelper from "../utils/dataHelper";
import * as status from "../constants/statusConstants";
export function authorMiddleware(
    req: RequestWithUser<any>,
    res: Response,
    next: NextFunction
) {
    const { role } = req.user;
    if (role === "ADMIN") {
        next();
    } else {
        res.status(status.FORBIDDEN).send(
            dataHelper.getResponseForm(
                null,
                null,
                "You need permission to access to this action!"
            )
        );
    }
}
