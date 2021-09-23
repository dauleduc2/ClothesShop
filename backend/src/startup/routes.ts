import { Application } from "express";
import * as express from "express";
import productRouter from "../routes/productRoute";
import * as helmet from "helmet";

export default function (app: Application) {
  app.use(helmet());
  app.use(express.static(process.cwd() + "/public/"));
  app.use("/api/product", productRouter);
}
