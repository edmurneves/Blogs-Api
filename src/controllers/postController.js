const express = require('express');

const authenticateMiddleware = require('../middleware/auth');

const postRouter = express.Router();
const postService = require('../services/postService');

postRouter.post('/', authenticateMiddleware, async (req, res) => {
    const token = req.headers.authorization;
    const { title, content, categoryIds } = req.body;

    if (!title || !content || !categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }   
  
    const newPost = await postService.createPost(token, title, content, categoryIds);
    res.status(201).json(newPost);
});

postRouter.get('/', authenticateMiddleware, async (req, res) => {
    const posts = await postService.getAllPost();
    res.status(200).json(posts);
});

module.exports = postRouter;