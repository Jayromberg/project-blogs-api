const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = {
  createPost,
};
