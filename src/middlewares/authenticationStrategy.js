const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const loginStrategy = (passportLogin) => {
  passportLogin.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  (async (email, password, done) => {
    try {
      const user = await userService.findUser({ email, password });
      done(null, user);
    } catch (error) {
      done(error);
    }
  })));
};

const validationStrategy = (passportToken) => {
  passportToken.use(new BearerStrategy(
    (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        done(null, payload);
      } catch (error) {
        done(error);
      }
  },
  ));
};

module.exports = (passport) => {
  loginStrategy(passport);
  validationStrategy(passport);
};
