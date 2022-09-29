const jwt = require('jsonwebtoken');
const { userService } = require('../services');

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

const registerUser = async (req, res) => {
  console.log(req.user);
  const newUser = await userService.createUser(req.user);
  const token = tokenGenerator(newUser);
  res.set('Authorization', token);
  res.status(201).json({ token });
};

module.exports = {
  login,
  registerUser,
};
