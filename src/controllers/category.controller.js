const { categoryService } = require('../services');

const nameExist = (req) => {
  const { name } = req.body;
  if (!name) {
    throw new Error('NAME_IS_REQUIRED');
  }
};

const registerCategory = async (req, res) => {
  nameExist(req);
  const newCategory = await categoryService.createCategory(req.body);
  res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const allCategories = await categoryService.findAllCategories();
  res.status(200).json(allCategories);
};

module.exports = {
  registerCategory,
  getAllCategories,
};
