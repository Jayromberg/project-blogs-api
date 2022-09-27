const UserService = require('../services/user.service');

class UserController {
  static async getUser(req, res) {
    const user = await UserService.findUser(req.body);
    res.status(200).json(user);
  }
}

module.exports = UserController;
