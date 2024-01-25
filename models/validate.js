const Joi = require("joi");

const joiContact = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  favoriteColor: Joi.string().required(),
  birthdate: Joi.string(),
});

module.exports = joiContact;
