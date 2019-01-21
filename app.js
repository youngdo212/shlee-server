const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const apiRouter = require('./routes/api.js');
const homeRouter = require('./routes/home.js');
const projectRouter = require('./routes/project.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  prefix: '/stylesheets'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.get('/info', (req, res) => res.render('info'));
app.use('/project', projectRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).send('Sorry! NOT FOUND');
});

module.exports = app;
