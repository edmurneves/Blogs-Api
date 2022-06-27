const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
    if (!name) {
        const error = { status: 400, message: '"name" is required' };
        throw error;
    }

    const newCategory = await Category.create({ name });
    return newCategory;
};

const getCategories = async () => Category.findAll();

module.exports = {
    createCategory,
    getCategories,    
};