const { Router } = require('express');
const { blogPostController } = require('../controllers');
const resolver = require('../util/routeAdapter');
const { accessAuthentication } = require('../middlewares');

const router = Router();

router
  .post('/post',
    resolver(accessAuthentication),
    resolver(blogPostController.registerPost))
  .get('/post/:id',
    resolver(accessAuthentication),
    resolver(blogPostController.getPostById))
  .get('/post',
    resolver(accessAuthentication),
    resolver(blogPostController.getAllPosts));

module.exports = router;