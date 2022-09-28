const { Router } = require('express');
const { userController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const localAuthentication = require('../middlewares/localAuthentication');

const router = Router();

router
  .post('/login',
    localAuthentication,
    resolver(userController.getUser));

module.exports = router;
