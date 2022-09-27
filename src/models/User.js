const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    displayName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    image: DataTypes.STRING
  }, 
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  return User;
};

module.exports = UserModel;
