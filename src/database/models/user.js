const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, { as: 'blogposts', foreignKey: 'userId'});
  }

  return UserTable;
};

module.exports = UserSchema;
