var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

router.get('/', function(req, res) {
    res.render('formDataInsert');
});

module.exports = router;