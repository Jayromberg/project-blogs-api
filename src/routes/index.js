const user = require('./user.route');
const { errorMiddleware } = require('../middlewares'); 

module.exports = (app) => {
  app.use(
    user,
    errorMiddleware,
  );
};
