const passport = require('passport');

const tokenExist = (token) => {
  if (!token) {
    throw new Error('TOKEN_NOT_FOUND');
  }
};

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  tokenExist(token);
  
  passport.authenticate(
    'header',
    { session: false },
    (error, user, _info) => {
      if (error && error.name === 'JsonWebTokenError') {
        return next(new Error('INVALID_TOKEN'));
      }
      
      if (error) return next(error);

      req.user = user;
      return next();
    },
  )(req, res, next);
};
