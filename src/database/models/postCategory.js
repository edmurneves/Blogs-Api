const PostCategorySchema = (sequelize, DataTypes) => {
    const PostCategoryTable = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primayKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    }, { timestamps: false });

    PostCategoryTable.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            as: 'blogs',
            through: PostCategoryTable,
            foreignKey: 'categoryId',
            otherKey: 'postId'
        });

        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategoryTable,
            foreignKey: 'postId',
            otherKey: 'categoryId'
        });
    }
    return PostCategoryTable;
};

module.exports = PostCategorySchema;