var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

// router.post('/confirmation/*', function(req, res, next) {
//   res.render('logIn');
//   next();
// }, userController.confirmation); 

module.exports = router;
