var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');
//var flash = require('connect-flash');
var minify = require('express-minify');

var index = require('./routes/index');
var action = require('./routes/action');
var api = require('./routes/api');

var app = express();

// environment setting
var mode = 'deploy';
app.set('env', mode);
if (mode === 'development') {
    app.use(logger('dev'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* cookie and session
app.use(cookieParser());
app.use(session({
  secret: 'Haynes',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());*/

// minimize stylesheet files
app.use(minify({
    css_match: /text\/css/
}));

app.use('/', index);
app.use('/action', action);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
