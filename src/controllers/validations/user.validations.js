const userExist = (user) => {
  if (!user) {
    throw new Error('USER_DOES_NOT_EXIST');
  }
};

module.exports = {
  userExist,
};
