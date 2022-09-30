const CategoryModel = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
    {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    });

  return category;
};

module.exports = CategoryModel;
