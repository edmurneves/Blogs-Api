const { BlogPost, User, Category } = require('../database/models');

// const createPost = async ({ title, content, categoryIds }) => {
//     if (!title || !content) {
//         const error = { status: 400, message: 'Some required fields are missing' };
//         throw error;
//     }

//     if (categoryIds.length < 1) {
//         const error = { status: 400, message: '"categoryIds" not found' };
//         throw error;
//     }

//     const user = await User.findOne({
//         attributes: ['displayName', 'email'],
//         where: { email, password },
//     });

//     if (!user) {
//         const error = { status: 400, message: 'Invalid fields' };
//         throw error;
//     }
// };

const getAllPost = async () => {
    const blogs = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return blogs;
};

module.exports = {
    // createPost,
    getAllPost,
};