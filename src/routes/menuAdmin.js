var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

// GET
router.get('/', function(req, res) {
    res.render('menuAdmin', { title: 'Menú' });
});

router.get('/createUserAdmin', function(req, res) {
    res.render('createUserAdmin', { title: 'Crear usuario' });
});

router.get('/updateUserAdmin', function(req, res) {
    res.render('updateUserAdmin', { title: 'Modificar usuario' });
});

router.get('/deleteUserAdmin', function(req, res) {
    res.render('deleteUserAdmin', { title: 'Eliminar usuario' });
});

router.get('/findUserAdmin', function(req, res) {
    res.render('findUserAdmin', { title: 'Buscar usuario' });
});

// POST
router.post('/createUserAdmin', adminController.createUser);
router.post('/updateUserAdmin', adminController.updateUser);
router.post('/deleteUserAdmin', adminController.deleteUser);
router.post('/findUserAdmin', adminController.findUser);

module.exports = router;