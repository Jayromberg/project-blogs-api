const { User } = require('../models');

const findUserByEmail = (email) => {
  const user = User.findOne({
    where: { email },
  });

  return user;
};

const createUser = (data) => {
  const newUser = User.create(data);
  return newUser;
};

const findAllUsers = () => {
  const allUsers = User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const findUserById = (id) => {
  const user = User.findOne({
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
