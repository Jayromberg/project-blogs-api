const { Router } = require('express');
const { blogPostController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const { accessAuthentication } = require('../middlewares');

const router = Router();

router
  .post('/post',
    resolver(accessAuthentication),
    resolver(blogPostController.registerPost));
//   .get('/categories',
//     resolver(accessAuthentication),
//     resolver(categoryController.getAllCategories));

module.exports = router;