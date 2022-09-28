const { userService } = require('../services');

const getUser = async (req, res) => {
  const user = await userService.findUser(req.body);
  res.status(200).json(user);
};

module.exports = {
  getUser,
};
