var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var expressValidator = require('express-validator');

var app = express();

var { mongoose } = require('./data/database');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
app.use('/confirmation', require('./routes/confirmation'));

app.use('/menuAdmin', require('./routes/menuAdmin'));               // admin

// server
app.listen(app.get('port'), function() {
  console.log('Server listening at port', app.get('port'));
});
