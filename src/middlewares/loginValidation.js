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

module.exports = (req, _res, next) => {
  const { error } = bodyValidation(req.body);
  if (error) throw new Error(error.message);
  next();
};
