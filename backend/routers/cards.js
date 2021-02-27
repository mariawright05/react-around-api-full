const express = require('express');
const { getCards, createCard, deleteCard } = require('../controllers/cardController');

const cardRouter = express.Router();

cardRouter.get('/', getCards);

cardRouter.post('/', createCard);

cardRouter.delete('/:cardId', deleteCard);

module.exports = cardRouter;
