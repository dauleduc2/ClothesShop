import { Application } from "express";
import * as express from "express";
import * as helmet from "helmet";
import productRouter from "../routes/productRoute";
import userRouter from "../routes/userRoute";
import colorRouter from "../routes/colorRoute";
import sizeRouter from "../routes/sizeRoute";
import typeRouter from "../routes/typeRoute";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";

export default function (app: Application) {
    app.use(express.json());
    app.use(helmet());
    app.use(express.static(process.cwd() + "/public/"));
    app.use(
        "/api/product",
        [authenMiddleware, authorMiddleware],
        productRouter
    );
    app.use("/api/user", userRouter);
    app.use("/api/color", [authenMiddleware, authorMiddleware], colorRouter);
    app.use("/api/size", [authenMiddleware, authorMiddleware], sizeRouter);
    app.use("/api/type", [authenMiddleware, authorMiddleware], typeRouter);
}
