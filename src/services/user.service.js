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

module.exports = {
  findUserByEmail,
  createUser,
};
