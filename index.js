require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routers = require("./router");
const port = process.env.port;
const bodyParser = require("body-parser");

const app = express();

const corsMw = cors({
  origin: "*",
  preflightContinue: false,
  // credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Credentials",
    "x-api-keyyy",
  ],
});

app.disable("x-powered-by");
app.disable("etag");
app.use(corsMw);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));

app.use("/", routers);

app.listen(port, () => {
  console.log(`serve running on port ${port}`);
});

