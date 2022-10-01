const PostCategoryModel = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId', 
      otherKey: 'categoryId', 
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'CategoryToBlogPost',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  }

  return postCategory;
};

module.exports = PostCategoryModel;
