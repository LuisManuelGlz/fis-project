var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

router.get('/', adminController.useDeleteUserTemplate);
router.post('/deleteUser', adminController.deleteUser);

module.exports = router;