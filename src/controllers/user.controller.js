const { userService } = require('../services');
const { tokenGenerator } = require('./jwt/token');
const { userExist } = require('./validations/user.validations');

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
