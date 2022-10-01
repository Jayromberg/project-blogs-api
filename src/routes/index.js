const user = require('./user.route');
const category = require('./category.route');
const blogPost = require('./blogPost.route');
const { errorMiddleware } = require('../middlewares'); 

module.exports = (app) => {
  app.use(
    user,
    category,
    blogPost,
    errorMiddleware,
  );
};
