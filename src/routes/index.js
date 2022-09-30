const user = require('./user.route');
const category = require('./category.route');
const { errorMiddleware } = require('../middlewares'); 

module.exports = (app) => {
  app.use(
    user,
    category,
    errorMiddleware,
  );
};
