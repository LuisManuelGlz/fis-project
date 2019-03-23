var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController')

// GET
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/logIn', function(req, res) {
  res.render('logIn');
})

router.get('/signUp', function(req, res) {
  res.render('signUp');
});

// POST
router.post('/logIn', userController.validateUser);
router.post('/signUp', userController.createUser);

module.exports = router;
