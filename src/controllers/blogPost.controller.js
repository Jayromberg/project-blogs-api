const Joi = require('joi');
const { blogPostService } = require('../services');

const { validateString } = require('../util/joiValidations');

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

const validationToPost = (body) => {
  const { error } = bodyValidationToRegisterPost(body);

  if (error) {
    throw new Error(error.message);
  }
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

const categoriesExist = async (req) => {
  const response = await validateCategories(req);

  if (response) {
    throw new Error('CATEGORY_IDS_NOT_FOUND');
  }
};

const registerPost = async (req, res) => {
  validationToPost(req);
  await categoriesExist(req);
  const newPost = await blogPostService.createPost(req);
  res.status(201).json(newPost);
};

const getAllPosts = async (_req, res) => {
  const allPosts = await blogPostService.findAllPosts();
  res.status(200).json(allPosts);
};

const postExist = (post) => {
  if (!post) {
    throw new Error('POST_DOES_NOT_EXIST');
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.findPostById(id);
  postExist(post);
  res.status(200).json(post);
};

const userValidatorToUpdate = async (req) => {
  const { params, user: { id } } = req;
  const { userId } = await blogPostService.findPostById(params.id);

  if (userId !== id) { 
    throw new Error('UNAUTHORIZED_USER');
  }
};

const updatePost = async (req, res) => {
  validationToPost(req);
  await userValidatorToUpdate(req);
  const { id } = req.params;
  const update = await blogPostService.updatePost(id, req.body);
  res.status(200).json(update);
};

module.exports = {
  registerPost,
  getAllPosts,
  getPostById,
  updatePost,
};