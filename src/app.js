var express = require('express');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// initializations
var app = express();
var { mongoose } = require('./config/database/database');
require('./config/passport/local-auth-user');
require('./config/passport/local-auth-admin');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: 'thisismysecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));                      // user
app.use('/confirmation', require('./routes/confirmation'));

app.use('/menuAdmin', require('./routes/menuAdmin'));               // admin

// server
app.listen(app.get('port'), function() {
  console.log('Server listening at port', app.get('port'));
});
