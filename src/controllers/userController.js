const express = require('express');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.get('/', async (req, res) => {    
    const users = await userService.getUsers();   
    res.status(201).json(users);
});

module.exports = userRouter;