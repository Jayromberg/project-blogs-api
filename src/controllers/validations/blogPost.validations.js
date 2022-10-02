const Joi = require('joi');
const { blogPostService } = require('../../services');
const { validateString } = require('../../util/joiValidations');

const bodyValidationToRegisterPost = (req) => {
  const schema = Joi.object().keys({
    title: validateString().messages({
      'string.empty': 'UNDEFINED_FIELD',
      'any.required': 'UNDEFINED_FIELD',
    }),
    content: validateString().messages({
      'string.empty': 'UNDEFINED_FIELD',
      'any.required': 'UNDEFINED_FIELD',
    }),
    categoryIds: Joi.array().items(Joi.number()).messages({
      'any.required': 'UNDEFINED_FIELD',
      'array.base': 'UNDEFINED_FIELD',
      'number.base': 'UNDEFINED_FIELD',
    }),
  });

  return schema.validate(req.body);
};

const validateCategories = async (req) => {
  const { categoryIds } = req.body;
  
  const promiseGenerate = categoryIds
  .map((categoryId) => blogPostService.findAllPostCategory(categoryId));
  
  if (promiseGenerate.length === 0) return true;
  
  return Promise.all(promiseGenerate)
  .then((responses) => responses
  .some((response) => (response.count === 0)))
  .catch((error) => error);
};

const validationToPost = (body) => {
  const { error } = bodyValidationToRegisterPost(body);

  if (error) {
    throw new Error(error.message);
  }
};

const userValidatorToUpdateAndDelete = async (req) => {
  const { params, user: { id } } = req;
  const { userId } = await blogPostService.findPostById(params.id);

  if (userId !== id) { 
    throw new Error('UNAUTHORIZED_USER');
  }
};

const categoriesExist = async (req) => {
  const response = await validateCategories(req);

  if (response) {
    throw new Error('CATEGORY_IDS_NOT_FOUND');
  }
};

const postExist = (post) => {
  if (!post) {
    throw new Error('POST_DOES_NOT_EXIST');
  }
};

module.exports = {
  validationToPost,
  categoriesExist,
  postExist,
  userValidatorToUpdateAndDelete,
};