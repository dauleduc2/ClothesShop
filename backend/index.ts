//dotenv set up file
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, `./config/.env.${process.env.NODE_ENV}`),
});
//startup
const express = require("express");
const app = express();
require("./src/startup/middleware")(app);

export type AppType = ReturnType<typeof app>;
