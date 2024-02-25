const express = require("express");
const router = express.Router();
const ResponseError = require("../../module/ResponseError");
const Errors = require("../../module/Error");
const orderModel = require("../../models/order.model");
const orderValidation = require("../../validation/order.validation");

//GET api/orders/orders
router.get("/orders", async (req, res, next) => {
  try {
    const data = await orderModel.getAllOrders();
    res.json(data);
  } catch (err) {
    console.log(err);
    //showing generic errors for more secure app
    next(ResponseError.generateExceptionError(err));
  }
});

//GET api/orders/:id
router.get("/:id", async (req, res, next) => {
  try {
    const validateValues = await orderValidation.validateOrderIdSchema(
      req.params
    );

    const data = await orderModel.getOrderById(validateValues.id);

    //adding ordered items array
    data.items = await orderModel.getOrderedItemsOfOrder(validateValues.id);

    //Order not found
    if (data == undefined) {
      return next(new ResponseError(Errors.ERR404));
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    next(ResponseError.generateExceptionError(err));
  }
});

module.exports = router;
