const { Op } = require('sequelize');
const { User } = require('../models');

const findUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        { email },
        { password },
      ],
    },
  });

  return user;
};

module.exports = {
  findUser,
};
