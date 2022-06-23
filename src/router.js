const express = require('express');

const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');

const routers = express.Router();
routers.use('/login', loginController);
routers.use('/user', userController);

module.exports = routers;