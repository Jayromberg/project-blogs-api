const Joi = require('joi');

const validateString = () => Joi.string().required();

const validateStringAndMinimum = (limit) => Joi
  .string().min(limit).required();

const validateEmail = () => Joi.string().email().required();

module.exports = {
  validateStringAndMinimum,
  validateString,
  validateEmail,
};