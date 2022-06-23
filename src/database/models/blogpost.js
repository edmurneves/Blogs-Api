const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    timestamps: false,
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {as: 'user', foreignKey: 'id'});
  }
  return BlogPostTable;
};

module.exports = BlogPostSchema;













 