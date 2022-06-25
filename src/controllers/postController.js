const express = require('express');

const authenticateMiddleware = require('../middleware/auth');

const postRouter = express.Router();
const postService = require('../services/postService');

postRouter.post('/', async (req, res) => {
    const newPost = await postService.createPost(req.body);
    res.status(201).json(newPost);
});

postRouter.get('/', authenticateMiddleware, async (req, res) => {
    const posts = await postService.getAllPost();
    res.status(200).json(posts);
});

module.exports = postRouter;