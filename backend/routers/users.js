const express = require('express');
// const { celebrate, Joi, Segments } = require('celebrate');

const userRouter = express.Router();
const {
  getUsers,
  getOneUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/userController.js');

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:id', getOneUser);

userRouter.patch('/me/avatar', updateAvatar);

userRouter.patch('/me', updateUser);

module.exports = userRouter;
