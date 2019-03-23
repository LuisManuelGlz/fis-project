var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var expressValidator = require('express-validator');

var app = express();

// var { mongoose } = require('./data/database');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'viewsTemp'));
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

// routes
app.use('/', require('./routes/index'));                      // user
app.use('/logIn', require('./routes/logIn'));
app.use('/signUp', require('./routes/signUp'));
app.use('/confirmation', require('./routes/confirmation'));

app.use('/menuAdmin', require('./routes/menuAdmin'));               // admin
app.use('/createUserAdmin', require('./routes/createUserAdmin'));
app.use('/updateUserAdmin', require('./routes/updateUserAdmin'));
app.use('/deleteUserAdmin', require('./routes/deleteUserAdmin'));
app.use('/findUserAdmin', require('./routes/findUserAdmin'));
app.use('/formDataInsert', require('./routes/formDataInsert'));

// server
app.listen(app.get('port'), function() {
  console.log('Server listening at port', app.get('port'));
});
