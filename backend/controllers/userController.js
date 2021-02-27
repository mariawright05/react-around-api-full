const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../utils/jwt');

const SALT_ROUND = 10;

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.status(400).send({ message: err }));
}

function getOneUser(req, res) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'No such user exists' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid user ID' });
      }
      res.status(500).send({ message: err });
    });
}

const createUser = (req, res) => {
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
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // create a token
      const token = generateJWT(user._id);

      // return the token
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ message: err }));
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  login,
  getCurrentUser,
};
