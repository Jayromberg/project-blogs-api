const jwt = require('jsonwebtoken');

const tokenGenerator = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

  return token;
};

module.exports = {
  tokenGenerator,
};