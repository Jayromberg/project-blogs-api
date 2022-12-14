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
  TOKEN_NOT_FOUND: {
    code: 401,
    message: 'Token not found',
  },
  INVALID_TOKEN: {
    code: 401,
    message: 'Expired or invalid token',
  },
  USER_DOES_NOT_EXIST: {
    code: 404,
    message: 'User does not exist',
  },
  NAME_IS_REQUIRED: {
    code: 400,
    message: '"name" is required',
  },
  CATEGORY_IDS_NOT_FOUND: {
    code: 400,
    message: '"categoryIds" not found',
  },
  POST_DOES_NOT_EXIST: {
    code: 404,
    message: 'Post does not exist',
  },
  UNAUTHORIZED_USER: {
    code: 401,
    message: 'Unauthorized user',
  },
};

const mapError = (type) => errorMap[type] || { code: 500, message: 'Internal error' };

module.exports = mapError;