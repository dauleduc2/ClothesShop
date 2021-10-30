import { Application } from "express";
import * as express from "express";
import * as helmet from "helmet";
import productRouter from "../routes/productRoute";
import userRouter from "../routes/userRoute";
import colorRouter from "../routes/colorRoute";
import sizeRouter from "../routes/sizeRoute";
import typeRouter from "../routes/typeRoute";
import orderListRoute from "../routes/orderListRoute";
import adminOrderRouter from "../routes/adminOrderRoute";
import adminUserRouter from "../routes/adminUserRoute";
import adminProductRouter from "../routes/adminProductRoute";
import analystDataRouter from "../routes/analystDataRoute";
import { authenMiddleware } from "../middlewares/authenMiddleware";
import { authorMiddleware } from "../middlewares/authorMiddleware";
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
    app.use(
        "/api/admin/order",
        [authenMiddleware, authorMiddleware],
        adminOrderRouter
    );
    app.use(
        "/api/admin/user",
        [authenMiddleware, authorMiddleware],
        adminUserRouter
    );
    app.use(
        "/api/admin/product",
        [authenMiddleware, authorMiddleware],
        adminProductRouter
    );
    app.use(
        "/api/admin/analyst",
        [authenMiddleware, authorMiddleware],
        analystDataRouter
    );
}
