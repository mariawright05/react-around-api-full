/* eslint-disable consistent-return */
const NotFoundError = require('../middleware/errors/NotFoundError');
const ValidationError = require('../middleware/errors/ValidationError');
const ForbiddenError = require('../middleware/errors/ForbiddenError');
const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Unable to create card');
      }
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('There is no card with this ID');
      }
      if (req.user._id.toString() !== card.owner.toString()) {
        throw new ForbiddenError('You do not have permission to delete this card');
      }
      return Card.remove(card).then(() => { res.send({ data: card }); });
    })
    .catch(next);
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
