const UserService = require('../services/user.service');

class UserController {
  static async getUser(req, res) {
    try {
      const user = UserService.findUser(req.body);
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
