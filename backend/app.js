const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { regEx } = require('./utils/regEx');
const router = require('./routes');
const { NotFoundError } = require('./errors/NotFoundError');
const { errorCentralHandler } = require('./middlewares/errorCentralHandler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regEx),
    }),
  }),
  createUser
);

app.use(auth);
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

// Мидлвэр для централизованной обработки ошибок
app.use(errorCentralHandler);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
