const passport = require('passport');
const { bodyValidationToLogin } = require('../util/loginValidation');

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
