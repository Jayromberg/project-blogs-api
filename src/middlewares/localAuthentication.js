const passport = require('passport');
const { bodyValidation } = require('../util/loginValidation');

const loginValidation = (data) => {
  const { error } = bodyValidation(data);

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
      try {
        if (error) return next(error);
        userExist(user);
        req.user = user;
        return next();
      } catch (e) {
        return next(e);
      }
    },
    )(req, res, next);
  };
