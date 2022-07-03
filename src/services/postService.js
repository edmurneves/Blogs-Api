const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const jwt = require('jsonwebtoken');

const config = require('../database/config/config');
const { BlogPost, PostCategory, User, Category } = require('../database/models');

const sequelize = new Sequelize(config.development);

const secretKey = process.env.JWT_SECRET;

const createPost = async (token, title, content, categoryIds) => {    
    const { id } = jwt.verify(token, secretKey);  
    
    try {
        const newPost = await sequelize.transaction(async (t) => {            
            const post = await BlogPost.create(
                { title, content, userId: id, published: new Date(), updated: new Date() },
                { transaction: t },
            );
            await PostCategory.bulkCreate(categoryIds.map((idc) => (
                { postId: post.id, categoryId: idc })),
                { transaction: t });
            return post;
        });
        return newPost;        
    } catch (error) {
        const err = { status: 400, message: '"categoryIds" not found' };
        throw err;
    }
};

const getAllPost = async () => {
    const blogs = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return blogs;
};

const getById = async (id) => {       
    const blog = await BlogPost.findByPk(id, {        
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });    

    if (!blog) {
        const error = { status: 404, message: 'Post does not exist' };
        throw error;
    }   
    return blog;
};

const updatePost = async (id, title, content) => {
    await BlogPost.update({ title, content }, { where: { id } });

    const updatedPost = await getById(id);

    return updatedPost;
};

const removePost = async (id) => {
    await BlogPost.destroy({ where: { id } });
    return true;
};

const searchPost = async (q) => {    
    if (!q) return getAllPost();

    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${q}%` } },
                { content: { [Op.like]: `%${q}%` } },
            ],
        },
    });

    if (!posts) return [];

    return posts;
};

module.exports = {
    createPost,
    getAllPost,
    getById,
    updatePost,
    removePost,
    searchPost,
};