const passport = require('passport');
const Joi = require('joi');

const bodyValidationToRegistration = (body) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required()
      .messages({
        'string.min': 'INVALID_DISPLAY_NAME',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.email': 'INVALID_EMAIL',
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.min': 'INVALID_PASSWORD',
      }),
  }).options({ allowUnknown: true });

  return schema.validate(body);
};

const registrationValidation = (data) => {
  const { error } = bodyValidationToRegistration(data);

  if (error) {
    throw new Error(error.message);
  }
};

const userExist = (user) => {
  if (user) {
    throw new Error('REGISTERED_EMAIL');
  }
};

module.exports = (req, res, next) => {
  registrationValidation(req.body);

  passport.authenticate(
    'local',
    { session: false },
    (error, user, _info) => {
      if (error) return next(error);
      userExist(user);
      req.user = req.body;
      return next();
    },
  )(req, res, next);
};
