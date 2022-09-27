// https://www.youtube.com/watch?v=qHfZxpRqxYw

const resolver = (handlerFn) => (req, res, next) => Promise
  .resolve(handlerFn(req, res, next)).catch((e) => next(e));

module.exports = resolver;
