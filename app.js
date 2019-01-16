const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const apiRouter = require('./routes/api.js');

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
app.use('/project/:id', express.static(path.join(__dirname, 'public/project')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.get('/pug', (req, res, next) => {
  res.render('index', {title: 'pug', message: 'hello mando'});
});

app.use((req, res) => {
  res.status(404).send('Sorry! NOT FOUND');
});

module.exports = app;
