const express = require('express');

const checkUser = require('../middleware/checkUser');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.get('/', async (req, res) => {    
    const users = await userService.getUsers();   
    res.status(201).json(users);
});

userRouter.post('/', checkUser, async (req, res) => {
    const newUser = await userService.createUser(req.body);    
    res.status(201).json(newUser);
});

module.exports = userRouter;