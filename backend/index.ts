import { dbStartUp } from "./src/startup/db";
import * as express from "express";
import * as path from "path";
import * as dotenv from "dotenv";
import middlewareConfig from "./src/startup/middleware";
import routeConfig from "./src/startup/routes";
import "reflect-metadata";
//dotenv config
dotenv.config({
    path: path.resolve(__dirname, `./src/config/.env.${process.env.NODE_ENV}`),
});
//startup
const app = express();
middlewareConfig(app);
dbStartUp();
routeConfig(app);

//listen
const port = process.env.PORT || 27017;
app.listen(port, () => console.log(`listen on port ${port}...`));
