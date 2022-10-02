const { categoryService } = require('../services');
const { nameExist } = require('./validations/category.validations');

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
