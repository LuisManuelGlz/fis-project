var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/confirmation/*', function(req, res, next) {
//   res.render('signIn');
//   next();
// }, userController.confirmation); 

module.exports = router;
