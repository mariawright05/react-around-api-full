const bcrypt = require('bcryptjs');
const { generateJWT } = require('../utils/jwt');

const User = require('../models/user');
const AuthorizationError = require('../middleware/errors/AuthorizationError');
const ConflictError = require('../middleware/errors/ConflictError');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ValidationError = require('../middleware/errors/ValidationError');

const SALT_ROUND = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users === undefined) {
        throw new NotFoundError('No users found');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const getOneUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('User not found');
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // adding the hash to the database
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Invalid user');
      }
      if (err.code === '11000') {
        throw new ConflictError('User already exists');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // create a token
      const token = generateJWT(user._id);

      // return the token
      res.send({ email, token });
    })
    .catch(() => {
      throw new AuthorizationError('Invalid email or password');
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user._doc);
      } else {
        throw new NotFoundError('User does not exist');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Invalid user ID');
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('User validation failed');
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('User validation failed');
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  login,
  getCurrentUser,
  updateUser,
  updateAvatar,
};
