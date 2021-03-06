var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var indexRouter = require('./routes/index');
var resultRouter = require('./routes/calculator');
var signupRouter = require('./routes/signup');
var signinRouter = require('./routes/signin');
var protectedRouter = require('./routes/protected');
var login_protectedRouter = require('./routes/login_protected');
var login_resultRouter = require('./routes/login_result');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Connecte le client mongoose à la bonne base de données
mongoose.connect('mongodb://user:soccer49@ds041178.mlab.com:41178/fin-hance', { useNewUrlParser: true });

//enregistre la base de donnédans une variable facilement accessible
var db = mongoose.connection;

//Facilite le "error handling" des bases de donnnées
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // Signifie à la console que la connection s'est bien effectuée
  console.log("connected");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "123456"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/result', resultRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/protected', protectedRouter);
app.use('/login_protected', login_protectedRouter);
app.use('/login_result', login_resultRouter);

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
