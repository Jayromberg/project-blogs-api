const Joi = require('joi');

const bodyValidationToRegistration = (body) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(body);
};

module.exports = bodyValidationToRegistration;
