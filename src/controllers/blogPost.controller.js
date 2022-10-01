const { blogPostService } = require('../services');

const {
  validationToPost,
  categoriesExist,
  postExist,
  userValidatorToUpdate,
} = require('./validations/blogPost.validations');

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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await blogPostService.findPostById(id);
  postExist(post);
  res.status(200).json(post);
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