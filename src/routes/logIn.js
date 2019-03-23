var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var adminController = require('../controllers/adminController');

router.get('/', userController.useLogInTemplate);
// router.post('/validation', userController.validateUser);
router.post('/validation', adminController.validateAdmin);

module.exports = router;