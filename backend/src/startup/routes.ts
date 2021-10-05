import { Application } from "express";
import * as express from "express";
import * as helmet from "helmet";
import productRouter from "../routes/productRoute";
import userRouter from "../routes/userRoute";
import colorRouter from "../routes/colorRoute";
import sizeRouter from "../routes/sizeRoute";
import typeRouter from "../routes/typeRoute";
import orderListRoute from "../routes/orderListRoute";
export default function (app: Application) {
    app.use(express.json());
    app.use(helmet());
    app.use(express.static(process.cwd() + "\\uploads"));
    app.use("/api/product", productRouter);
    app.use("/api/user", userRouter);
    app.use("/api/color", colorRouter);
    app.use("/api/size", sizeRouter);
    app.use("/api/type", typeRouter);
    app.use("/api/orderlist", orderListRoute);
}
