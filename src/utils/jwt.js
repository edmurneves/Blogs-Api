require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'minhachave';

const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
};

const generateJWTToken = ({ id, displayName, email }) => 
    jwt.sign({ id, displayName, email }, JWT_SECRET, jwtConfig);

module.exports = {
    generateJWTToken,
};
