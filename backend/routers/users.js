const express = require('express');

const userRouter = express.Router();
const {
  getUsers,
  // getOneUser,
  getCurrentUser,
} = require('../controllers/userController.js');

userRouter.get('/', getUsers);

// userRouter.get('/:id', getOneUser);

userRouter.get('/me', getCurrentUser);

// userRouter.patch('/me/avatar', updateAvatar);

// userRouter.patch('/me', updateUser);

module.exports = userRouter;
