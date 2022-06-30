const jwt = require('jsonwebtoken');
const postService = require('../services/postService');

const secretKey = process.env.JWT_SECRET;

const checkPostOwner = async (req, res, next) => {
    const token = req.headers.authorization;
    
    const { id } = jwt.verify(token, secretKey);
    const post = await postService.getById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    const { dataValues: { userId } } = post;

    if (id !== userId) return res.status(401).json({ message: 'Unauthorized user' });

    next();
};

module.exports = checkPostOwner;