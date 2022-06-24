const express = require('express');

const checkUser = require('../middleware/checkUser');
const authenticateMiddleware = require('../middleware/auth');

const userRouter = express.Router();
const userService = require('../services/userService');

userRouter.get('/', authenticateMiddleware, async (req, res) => {    
    const users = await userService.getUsers();   
    res.status(200).json(users);
});

userRouter.get('/:id', authenticateMiddleware, async (req, res) => {
    const { id } = req.params;
    const user = await userService.getById(id);
    res.status(200).json(user);
});

userRouter.post('/', checkUser, async (req, res) => {
    const newUser = await userService.createUser(req.body);    
    res.status(201).json(newUser);
});

module.exports = userRouter;