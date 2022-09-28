const LocalStrategy = require('passport-local').Strategy;
const { userService } = require('../services');
const loginValidation = require('../util/loginValidation');

const userExist = (user) => {
  if (!user) {
    throw new Error('INVALID_FIELD');
  }
};

module.exports = (passport) => {
 passport.use(new LocalStrategy({
    usernameField: 'email',
    session: false,
  },
  (async (email, password, done) => {
    try {
      loginValidation({ email, password });
      const user = await userService.findUser({ email, password });
      userExist(user);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }))); 
};
