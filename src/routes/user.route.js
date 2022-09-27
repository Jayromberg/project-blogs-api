const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const resolver = require('../util/routeAdapter');
const bodyValidation = require('../middlewares/loginValidation');

const router = Router();

router
  .post('/login', bodyValidation, resolver(UserController.getUser));

module.exports = router;
