const { Category } = require('../models');

const createCategory = (name) => {
  const newCategory = Category.create(name);
  return newCategory;
};

module.exports = {
  createCategory,
};
