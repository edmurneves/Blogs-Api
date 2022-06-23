const { User } = require('../database/models');
const { generateJWTToken } = require('../utils/jwt');

const authenticate = async ({ email, password }) => {
    if (!email || !password) {
        const error = { status: 400, message: 'Some required fields are missing' };
        throw error;
    }

    const user = await User.findOne({
        attributes: ['id', 'displayName', 'email'],
        where: { email, password },
    });

    if (!user) {
        const error = { status: 400, message: 'Invalid fields' };
        throw error;
    }

    const token = generateJWTToken(user.dataValues);

    return { token };
};

module.exports = { authenticate };