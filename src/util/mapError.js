const errorMap = {
  UNDEFINED_FIELD: {
    code: 400,
    message: 'Some required fields are missing',
  },
  INVALID_FIELD: {
    code: 400,
    message: 'Invalid fields',
  },
  INVALID_DISPLAY_NAME: {
    code: 400,
    message: '"displayName" length must be at least 8 characters long',
  },
  INVALID_EMAIL: {
    code: 400,
    message: '"email" must be a valid email',
  },
  INVALID_PASSWORD: {
    code: 400,
    message: '"password" length must be at least 6 characters long',
  },
  REGISTERED_EMAIL: {
    code: 409,
    message: 'User already registered',
  },
};

const mapError = (type) => errorMap[type] || { code: 500, message: 'Internal error' };

module.exports = mapError;