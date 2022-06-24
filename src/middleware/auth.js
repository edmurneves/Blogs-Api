const { authenticateToken } = require('../utils/jwt');

const authenticateMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    const user = await authenticateToken(token);    
    if (!user) {
        const error = { status: 401, message: 'Expired or invalid token' };
        throw error;
    }
    res.status.user = user;
    next();
};

module.exports = authenticateMiddleware;