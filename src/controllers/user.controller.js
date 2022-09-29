const jwt = require('jsonwebtoken');

const tokenGenerator = (user) => {
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

const login = async (req, res) => {
  const token = tokenGenerator(req.user);
  res.set('Authorization', token);
  res.status(200).json({ token });
};

module.exports = {
  login,
};
