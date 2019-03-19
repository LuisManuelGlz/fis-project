var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var expressValidator = require('express-validator');
var createError = require('http-errors');

var { mongoose } = require('./data/database');

// we define routes
var indexRouter = require('./routes/index');                // user
var logIn = require('./routes/logIn');
var signUp = require('./routes/signUp');
var confirmation = require('./routes/confirmation');

var menuAdmin = require('./routes/menuAdmin');              // admin
var createUserAdmin = require('./routes/createUserAdmin');
var updateUserAdmin = require('./routes/updateUserAdmin');
var deleteUserAdmin = require('./routes/deleteUserAdmin');
var queryUserAdmin = require('./routes/queryUserAdmin');
var usersRouter = require('./routes/users');

// server creation
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// we use routes
app.use('/', indexRouter);                      // user
app.use('/logIn', logIn);
app.use('/signUp', signUp);
app.use('/confirmation', confirmation);

app.use('/menuAdmin', menuAdmin);               // admin
app.use('/createUserAdmin', createUserAdmin);
app.use('/updateUserAdmin', updateUserAdmin);
app.use('/deleteUserAdmin', deleteUserAdmin);
app.use('/queryUserAdmin', queryUserAdmin);
app.use('/users', usersRouter);

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
