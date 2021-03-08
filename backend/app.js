const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/userController');
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');

app.use(bodyParser.json());
app.use(helmet());

const corsOptions = {
  origin: '*',
  // credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json(), cors(corsOptions));
// app.options('*', cors());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');
const NotFoundError = require('./middleware/errors/NotFoundError');

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.get('*', () => {
  throw new NotFoundError('Requested resource not found');
});

// enabling the error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
