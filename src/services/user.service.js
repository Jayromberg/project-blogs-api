const { Op } = require('sequelize');
const { User } = require('../models');

class UserService {
  static async findUser({ email, password }) {
    const user = await User.findOne({ 
      where: { 
        [Op.and]: [
          { email },
          { password },
        ],
      },
    });

    return user;
  }
}

module.exports = UserService;
