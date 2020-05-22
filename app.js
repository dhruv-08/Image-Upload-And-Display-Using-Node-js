var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uploadRouter = require('./routes/upload');
var mongodb=require('mongodb');
var mongoose=require('mongoose');
var session=require('express-session');
var file=require('session-file-store')(session);
var app = express();
const url="mongodb://localhost:27017/hello";
const connect=mongoose.connect(url);
connect.then((db)=>{
  console.log('connect successfully');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name:'session-id',
    secret:'12345-67890-09876-54321',
    resave:false,
    saveUninitialized:false,
    store:new file()
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', uploadRouter);

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
