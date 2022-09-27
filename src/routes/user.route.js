const { Router } = require('express');
const UserController = require('../controllers/user.controller');

const router = Router();

router
  .get('/login', UserController.getUser);

module.exports = router;
