const passport = require('passport');
const Joi = require('joi');

const { validateString } = require('../util/joiValidations');

const bodyValidationToLogin = (body) => {
  const schema = Joi.object({
    email: validateString()
      .messages({
        'string.empty': 'UNDEFINED_FIELD',
        'any.required': 'UNDEFINED_FIELD',
      }),
    password: validateString()
      .messages({
        'string.empty': 'UNDEFINED_FIELD',
        'any.required': 'UNDEFINED_FIELD',
      }),
  });

  return schema.validate(body);
};

const loginValidation = (data) => {
  const { error } = bodyValidationToLogin(data);
  
  if (error) {
    throw new Error(error.message);
  }
};

const userExist = (user) => {
  if (!user) {
    throw new Error('INVALID_FIELD');
  }
};

module.exports = (req, res, next) => {
  loginValidation(req.body);

  passport.authenticate(
    'local',
    { session: false },
    (error, user, _info) => {
      if (error) return next(error);
      userExist(user);
      req.user = user;
      return next();
    },
  )(req, res, next);
};
