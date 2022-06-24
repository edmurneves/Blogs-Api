const express = require('express');
const categoriesService = require('../services/categoriesService');
const authenticateMiddleware = require('../middleware/auth');

const categoriesRouter = express.Router();

categoriesRouter.post('/', authenticateMiddleware, async (req, res) => {  
    const newCategory = await categoriesService.createCategory(req.body);
    res.status(201).json(newCategory);
});

categoriesRouter.get('/', authenticateMiddleware, async (req, res) => {
    const categories = await categoriesService.getCategories();
    res.status(200).json(categories);
});

module.exports = categoriesRouter;