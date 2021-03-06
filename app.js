var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var userAccountRouter = require('./routes/user/account/controller');
var adminRouter = require('./routes/admin/account/controller');
var profileDetailRouter = require('./routes/profile/account/controller');
var facultyRouter = require('./routes/faculty/account/controller');
var sqlRouter = require('./routes/sql/controller');

mongoose.connect('mongodb://127.0.0.1:27017/dbproject',{useNewUrlParser:true});
mongoose.Promise = global.Promise;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/userAccount',userAccountRouter);
app.use('/admin',adminRouter);
app.use('/faculty',facultyRouter);
app.use('/profile',profileDetailRouter);
app.use('/sql',sqlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;