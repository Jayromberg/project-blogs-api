const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (user) => {
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

const getUser = async (req, res) => {
  const token = tokenGenerator(req.user);
  res.set('Authorization', token);
  res.status(200).json({ token });
};

module.exports = {
  getUser,
};
