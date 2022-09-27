const user = require('./user.route');
const errorMiddleware = require('../middlewares/error'); 

module.exports = (app) => {
  app.use(
    user,
    errorMiddleware,
  );
};
