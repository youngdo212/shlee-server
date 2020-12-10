const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');
require('dotenv').config();

const apiRouter = require('./routes/api.js');
const homeRouter = require('./routes/home.js');
const projectRouter = require('./routes/project.js');
const workRouter = require('./routes/work');
const labRouter = require('./routes/lab');
const infoRouter = require('./routes/info.js');
const dashboardRouter = require('./routes/dashboard');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');

const sessionOptions = {
  store: new RedisStore(),
  secret: 'mandosecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 86400000,
  },
};

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
    prefix: '/stylesheets',
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  })
);

// session setting for production
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));

app.use('/', homeRouter);
app.use('/api', apiRouter);
app.use('/project', projectRouter);
app.use('/work', workRouter);
app.use('/lab', labRouter);
app.use('/info', infoRouter);
app.use('/dashboard', dashboardRouter);
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);

// TODO: 대시보드로 변경하기
app.use('/mando', express.static(path.join(__dirname, 'build')));
app.get('/mando/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Sorry! NOT FOUND');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
