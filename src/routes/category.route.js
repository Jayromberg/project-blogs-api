const { Router } = require('express');
const { categoryController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const { accessAuthentication } = require('../middlewares');

const router = Router();

router
  .post('/categories',
    resolver(accessAuthentication),
    resolver(categoryController.registerCategory))
  .get('/categories',
    resolver(accessAuthentication),
    resolver(categoryController.getAllCategories));

module.exports = router;