const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/userController');
const auth = require('./middleware/auth');

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');

app.use((req, res, next) => {
  req.user = {
    _id: '5fe8cbdeb3e1372cf078d9c9',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', auth, cardRouter);
app.post('/signin', login);
app.post('/signup', createUser);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
