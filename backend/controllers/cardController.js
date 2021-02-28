/* eslint-disable consistent-return */
// const NotFoundError = require('../middleware/errors/NotFoundError');
const ValidationError = require('../middleware/errors/ValidationError');
const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
}

function deleteCard(req, res) {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'No such card exists' });
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card ID' });
      }
      res.status(500).send({ message: err });
    });
}

function createLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new ValidationError('This card was already liked');
    })
    .catch(next);
}

function deleteLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new ValidationError('This card has not been liked');
    })
    .catch(next);
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  createLike,
  deleteLike,
};
