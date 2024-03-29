import { Application } from "express";
import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";

export default function (app: any) {
    console.log("hehe");
    app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
    app.use(cookieParser());
    app.use(express.static("uploads"));
}
