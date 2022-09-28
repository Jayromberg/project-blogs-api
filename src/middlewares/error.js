const mapError = require('../util/mapError');

module.exports = (error, _req, res, _next) => {
  if (error) { 
    const err = mapError(error.message);
    return res.status(err.code).json({ message: err.message }); 
  }
  res.status(500).json({ message: error.message });
};
