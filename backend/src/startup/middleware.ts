import { AppType } from "./../../index";

const express = require("express");

module.exports = function (app: AppType) {
  const cors = require("cors");
  const cookieParser = require("cookie-parser");
  app.use(cors({ origin: process.env.client_url, credentials: true }));
  app.use(cookieParser());
  app.use(express.static("public"));
};
