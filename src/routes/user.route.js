const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const resolver = require('../util/routeAdapter');

const router = Router();

router
  .get('/login', resolver(UserController.getUser));

module.exports = router;
