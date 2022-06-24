const express = require('express');

const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');

const routers = express.Router();
routers.use('/login', loginController);
routers.use('/user', userController);
routers.use('/categories', categoriesController);

module.exports = routers;