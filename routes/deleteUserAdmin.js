var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('deleteUserAdmin', {});
});

module.exports = router;