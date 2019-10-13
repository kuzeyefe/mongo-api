var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var genreRouter = require('./routes/genre');
var customerRouter = require('./routes/customer');
const movieRouter=require('./routes/movie');
const rentalRouter=require('./routes/rental');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/genre',genreRouter);
app.use('/customer',customerRouter);
app.use('/movie',movieRouter);
app.use('/rental', rentalRouter);
module.exports = app;
