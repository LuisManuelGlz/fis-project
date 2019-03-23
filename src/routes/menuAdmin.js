var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

// GET
router.get('/', function(req, res) {
    res.render('menuAdmin');
});

router.get('/createUserAdmin', function(req, res) {
    res.render('createUserAdmin');
});

router.get('/updateUserAdmin', function(req, res) {
    res.render('updateUserAdmin');
});

router.get('/deleteUserAdmin', function(req, res) {
    res.render('deleteUserAdmin');
});

router.get('/findUserAdmin', function(req, res) {
    res.render('findUserAdmin');
});

// POST
router.post('/createUserAdmin', adminController.createUser);
router.post('/updateUserAdmin', adminController.updateUser);
router.post('/deleteUserAdmin', adminController.deleteUser);
router.post('/findUserAdmin', adminController.findUser);

module.exports = router;