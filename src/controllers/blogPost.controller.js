const { blogPostService } = require('../services');

const registerPost = async (req, res) => {
  const newPost = await blogPostService.createPost(req);
  res.status(200).json(newPost);
};

module.exports = {
  registerPost,
};