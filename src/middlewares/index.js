const authenticationStrategy = require('./authenticationStrategy');
const errorMiddleware = require('./error');
const loginAuthentication = require('./loginAuthentication');
const registrationAuthentication = require('./registrationAuthentication');
const accessAuthentication = require('./accessAuthentication');

module.exports = {
  authenticationStrategy,
  errorMiddleware,
  loginAuthentication,
  registrationAuthentication,
  accessAuthentication,
};
