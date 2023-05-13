const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../utils/regEx');

const { getAllCards } = require('../controllers/cards');
const { createCard } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');

cardsRouter.get('/', getAllCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regEx),
  }),
}), createCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
