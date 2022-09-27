const { User } = require('../models');

class UserService {
  static async getUser({ email, password }) {
    const user = await User.findOne({ 
      where: { 
        email,
        password,
      },
    });

    return user;
  }
}

module.exports = UserService;
