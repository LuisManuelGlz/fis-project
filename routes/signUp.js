var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.useTemplate);
router.post('/createUser', userController.createUser);

module.exports = router;