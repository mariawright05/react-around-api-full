const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

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

userRouter.get('/:id', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().length(24).required(),
  }),
}), getOneUser);

userRouter.post('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), updateAvatar);

userRouter.post('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = userRouter;
