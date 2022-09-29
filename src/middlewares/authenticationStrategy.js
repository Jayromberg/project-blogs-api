const LocalStrategy = require('passport-local').Strategy;
const HeaderStrategy = require('passport-http-header-strategy').Strategy;
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
      const userData = await userService.findUserByEmail(email) || { password: null };
      
      if (userData.password === password) {
        return done(null, userData);
      }

      done(null, false);
    } catch (error) {
      done(error);
    }
  })));
};

const validationStrategy = (passportToken) => {
  passportToken.use(new HeaderStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await userService.findUserByEmail(payload.email);
        
        if (userData) {
          return done(null, userData);
        }

        done(null, false);
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
