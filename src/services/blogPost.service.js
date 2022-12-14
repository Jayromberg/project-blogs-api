const { Op } = require('sequelize');

const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const dateGenerate = () => {
  const date = new Date().toISOString();
  return date;
};

const createNewPost = (body, id, t) => {
  const response = BlogPost.create({ 
    ...body, userId: id, published: dateGenerate(), updated: dateGenerate(),
  },
  {
    transaction: t,
    attributes: { exclude: ['categoryIds'] },
  });

  return response;
};

const createNewPostCategory = async (data, t) => {
  await PostCategory.bulkCreate(data,
  {
    transaction: t,
  });
};

const converterToPostCategory = (body, newPost) => {
  const { categoryIds } = body;
  const { id } = newPost;

  const converter = categoryIds.map((e) => { 
    const newData = { postId: id, categoryId: e };
    return newData;
  });
  
  return converter;
};

const createPost = async (req) => {
  const { body, user: { id } } = req;

  const result = await sequelize.transaction(async (t) => {
    const newPost = await createNewPost(body, id, t);
    const response = converterToPostCategory(body, newPost);
    await createNewPostCategory(response, t);
    return newPost;
  });

  return result;
};

const findAllPostCategory = async (categoryId) => {
  const categories = await Category.findAndCountAll({
    where: { id: categoryId },
  });

  return categories;
};

const findAllPosts = () => {
  const posts = BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return posts;
};

const findPostById = (id) => {
  const post = BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return post;
};

const updatePost = async (id, body) => {
  const [update] = await BlogPost.update({
    ...body,
    updated: dateGenerate(),
  }, {
    where: { id },
  });

  if (update === 1) {
    const post = await findPostById(id);
    return post;
  }

  return null;
};

const deletePost = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
};

const findPosts = (q) => {
  const query = `%${q}%`;
  const result = BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: query } },
        { content: { [Op.like]: query } },
      ],
    },
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

module.exports = {
  createPost,
  findAllPostCategory,
  findAllPosts,
  findPostById,
  updatePost,
  deletePost,
  findPosts,
};
