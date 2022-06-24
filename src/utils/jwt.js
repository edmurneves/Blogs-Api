require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'minhachave';

const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
};

const generateJWTToken = ({ displayName, email }) => 
    jwt.sign({ displayName, email }, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
    if (!token) {
        const error = { status: 401, message: 'Token not found' };
        throw error;
    }

    try {
        const validate = await jwt.verify(token, JWT_SECRET);        
        return validate;
    } catch (error) {
        const errorMessage = { status: 401, message: 'Expired or invalid token' };
        throw errorMessage;
    }
};

module.exports = {
    generateJWTToken,
    authenticateToken,
};
