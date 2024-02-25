var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const errorHandler = require("./middleware/errorHandler.mw");
const ResponseError = require("./module/ResponseError");
const Error = require("./module/Error");

var apiRouter = require("./routes/api");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.disable("x-powered-by");

app.use("/api", apiRouter);

app.use("*", (req, res, next) => {
  next(new ResponseError(Error.ERR404));
});
app.use(errorHandler);

module.exports = app;
