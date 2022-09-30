const { Category } = require('../models');

const createCategory = (name) => {
  const newCategory = Category.create(name);
  return newCategory;
};

const findAllCategories = () => {
  const allCategories = Category.findAll();
  return allCategories;
};

module.exports = {
  createCategory,
  findAllCategories,
};
