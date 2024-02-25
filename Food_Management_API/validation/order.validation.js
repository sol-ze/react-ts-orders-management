const Joi = require("joi");
const validate = require("./validation");

const orderIdSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

const validateOrderIdSchema = (userInput) => validate(userInput, orderIdSchema);

module.exports = {
  validateOrderIdSchema,
};
