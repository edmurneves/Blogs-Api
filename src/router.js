const express = require('express');

const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');

const routers = express.Router();
routers.use('/login', loginController);
routers.use('/user', userController);
routers.use('/categories', categoriesController);
routers.use('/post', postController);

module.exports = routers;