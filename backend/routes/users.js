const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regEx } = require('../utils/regEx');

const { getUsers } = require('../controllers/users');
const { getUserInfo } = require('../controllers/users');
const { getUserById } = require('../controllers/users');
const { updateProfile } = require('../controllers/users');
const { updateAvatar } = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserInfo);

usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(regEx),
    }),
  }),
  updateAvatar
);

module.exports = usersRouter;
