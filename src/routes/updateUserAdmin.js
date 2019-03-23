var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

router.get('/', adminController.useUpdateUserTemplate);
router.post('/updateUser', adminController.updateUser);

module.exports = router;