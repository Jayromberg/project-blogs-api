const { Router } = require('express');
const { userController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const { loginAuthentication, registrationAuthentication } = require('../middlewares');

const router = Router();

router
  .post('/login',
    resolver(loginAuthentication),
    resolver(userController.login))
  .post('/user',
    resolver(registrationAuthentication),
    resolver(userController.registerUser));

module.exports = router;
