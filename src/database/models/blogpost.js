const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {as: 'user', foreignKey: 'id'});
  }
  return BlogPostTable;
};

module.exports = BlogPostSchema;













 