const express = require('express');

const authenticateMiddleware = require('../middleware/auth');
const checkPostOwner = require('../middleware/checkPostOwner');

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

postRouter.get('/:id', authenticateMiddleware, async (req, res) => {
    const { id } = req.params;
    const post = await postService.getById(id);
    res.status(200).json(post);
});

postRouter.put('/:id', authenticateMiddleware, checkPostOwner, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const updatedPost = await postService.updatePost(id, title, content);
    res.status(200).json(updatedPost);
});

module.exports = postRouter;