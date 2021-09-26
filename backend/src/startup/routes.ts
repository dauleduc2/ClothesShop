import { Application } from "express";
import * as express from "express";
import productRouter from "../routes/productRoute";
import userRouter from "../routes/userRoute";
import * as helmet from "helmet";

export default function (app: Application) {
    app.use(express.json());
    app.use(helmet());
    app.use(express.static(process.cwd() + "/public/"));
    app.use("/api/product", productRouter);
    app.use("/api/user", userRouter);
}
