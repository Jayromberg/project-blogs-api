const errorMap = {
  UNDEFINED_FIELD: {
    code: 400,
    message: 'Some required fields are missing',
  },
  INVALID_FIELD: {
    code: 400,
    message: 'Invalid fields',
  },
};

const mapError = (type) => errorMap[type] || { code: 500, message: 'Internal error' };

module.exports = mapError;