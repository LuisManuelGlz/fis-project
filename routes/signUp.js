var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.useTemplate);
router.post('/createUser', userController.createUser);
// router.get('/confirmation/*', userController.confirmation);

module.exports = router;