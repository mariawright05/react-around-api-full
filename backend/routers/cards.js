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

cardRouter.put('/likes/:cardId', createLike);

cardRouter.delete('/likes/:cardId', deleteLike);

module.exports = cardRouter;
