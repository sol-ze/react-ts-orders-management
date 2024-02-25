const express = require("express");
const router = express.Router();
const ResponseError = require("../../module/ResponseError");
const Errors = require("../../module/Error");
const configModel = require("../../models/config.model.js");

//GET api/config/Configurations
router.get("/Configurations", async (req, res, next) => {
  try {
    const data = await configModel.getConfigurations();
    res.json(data);
  } catch (err) {
    console.log(err);
    //showing generic errors for more secure app
    next(ResponseError.generateExceptionError(err));
  }
});

module.exports = router;
