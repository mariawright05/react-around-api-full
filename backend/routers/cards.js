const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  createLike,
  deleteLike,
} = require('../controllers/cardController');

const cardRouter = express.Router();

cardRouter.get('/', getCards);

cardRouter.post('/', createCard);

cardRouter.delete('/:cardId', deleteCard);

cardRouter.put('/:cardId/likes', createLike);

cardRouter.delete('/:cardId/likes', deleteLike);

module.exports = cardRouter;
