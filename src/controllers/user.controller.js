const jwt = require('jsonwebtoken');
const { userService } = require('../services');

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

const userExist = (user) => {
  if (!user) {
    throw new Error('USER_DOES_NOT_EXIST');
  }
};

const login = async (req, res) => {
  const token = tokenGenerator(req.user);
  res.set('Authorization', token);
  res.status(200).json({ token });
};

const registerUser = async (req, res) => {
  const newUser = await userService.createUser(req.user);
  const token = tokenGenerator(newUser);
  res.set('Authorization', token);
  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const allUsers = await userService.findAllUsers();
  return res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findUserById(id);
  userExist(user);
  res.status(200).json(user);
};

module.exports = {
  login,
  registerUser,
  getAllUsers,
  getUserById,
};
