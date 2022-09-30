const { User } = require('../models');

const findUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

const createUser = async (data) => {
  const newUser = await User.create(data);
  return newUser;
};

const findAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const findUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { 
      exclude: ['password'],
    },
  });

  return user;
};

module.exports = {
  findUserByEmail,
  createUser,
  findAllUsers,
  findUserById,
};
