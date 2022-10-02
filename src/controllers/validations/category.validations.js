const nameExist = (req) => {
  const { name } = req.body;
  if (!name) {
    throw new Error('NAME_IS_REQUIRED');
  }
};

module.exports = {
  nameExist,
};