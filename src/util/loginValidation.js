const Joi = require('joi');

const bodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'any.required': 'UNDEFINED_FIELD',
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'UNDEFINED_FIELD',
      }),
  });

  return schema.validate(body);
};

module.exports = {
  bodyValidation,
};
