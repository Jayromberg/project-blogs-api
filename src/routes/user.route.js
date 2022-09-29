const { Router } = require('express');
const { userController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const localAuthentication = require('../middlewares/localAuthentication');

const router = Router();

router
  .post('/login',
    resolver(localAuthentication),
    resolver(userController.login))
  .post('/user',
    resolver(userController.registerUser));

module.exports = router;
