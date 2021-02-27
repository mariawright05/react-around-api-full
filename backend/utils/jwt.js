const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'thisisthebestsecretever';

const generateJWT = (_id) => {
  jwt.sign(
    { _id },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
};

const isAuthorized = (token) => {
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return false;

    return User.findOne({ _id: decoded._id })
      .then(user => Boolean(user));
  });
};

module.exports = { generateJWT, isAuthorized };
