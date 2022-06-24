const express = require('express');
const categoriesService = require('../services/categoriesService');
const authenticateMiddleware = require('../middleware/auth');

const categoriesRouter = express.Router();

categoriesRouter.post('/', authenticateMiddleware, async (req, res) => {  
    const category = await categoriesService.createCategory(req.body);
    res.status(201).json(category);
});

module.exports = categoriesRouter;