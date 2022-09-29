const { Router } = require('express');
const { userController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const { 
  loginAuthentication,
  registrationAuthentication,
  accessAuthentication,
} = require('../middlewares');

const router = Router();

router
  .post('/login',
    resolver(loginAuthentication),
    resolver(userController.login))
  .post('/user',
    resolver(registrationAuthentication),
    resolver(userController.registerUser))
  .get('/user',
    resolver(accessAuthentication),
    resolver(userController.getAllUsers));

module.exports = router;
