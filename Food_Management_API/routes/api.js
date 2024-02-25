var express = require("express");
var router = express.Router();
const errorHandler = require("../middleware/errorHandler.mw");
const ResponseError = require("../module/ResponseError");
const Errors = require("../module/Error");
const ordersRouter = require("./api/orders");
const configurationRouter = require("./api/config");

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    res.status(Error.ERR404.status).json(Error.ERR404.message);
  } catch (err) {
    next(ResponseError(Error.ERR404));
  }
});

//orders route
router.use("/orders", ordersRouter);

//config route
router.use("/config", configurationRouter);

//generic error handling
router.use(errorHandler);

module.exports = router;
