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
    
    if (!user) throw new Error('INVALID_FIELD');

    return user;
  }
}

module.exports = UserService;
