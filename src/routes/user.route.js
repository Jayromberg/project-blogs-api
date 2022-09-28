const { Router } = require('express');
const { userController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const bodyValidation = require('../middlewares/loginValidation');

const router = Router();

router
  .post('/login', bodyValidation, resolver(userController.getUser));

module.exports = router;
