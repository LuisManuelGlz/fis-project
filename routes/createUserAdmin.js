var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

router.get('/', adminController.useCreateUserTemplate);
router.post('/createUser', adminController.createUser);

module.exports = router;