const LocalStrategy = require('passport-local').Strategy;
const { userService } = require('../services');

module.exports = (passport) => {
 passport.use(new LocalStrategy({
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
