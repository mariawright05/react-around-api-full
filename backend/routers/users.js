const express = require('express');

const userRouter = express.Router();
const { getUsers, getOneUser, getCurrentUser } = require('../controllers/userController.js');

userRouter.get('/', getUsers);

userRouter.get('/:id', getOneUser);

userRouter.get('/me', getCurrentUser);

module.exports = userRouter;
