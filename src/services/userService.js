const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/jwt');

const getUsers = async () => {    
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    return users;
};

const getById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] },
    });

    if (!user) {
        const error = { status: 404, message: 'User does not exist' };
        throw error;
    }
    return user;
};

const createUser = async ({ displayName, email, password, image }) => {
    const newUser = await User.findOne({
        attributes: ['displayName', 'email'],
        where: { email },
    });

    if (newUser) {
        const error = { status: 409, message: 'User already registered' };
        throw error;
    }

    await User.create({ displayName, email, password, image });

    const token = generateJWTToken({ displayName, email });

    return { token };
};

module.exports = {
    getUsers,
    createUser,
    getById,
};