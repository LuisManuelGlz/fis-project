var express = require('express');
var router = express.Router();

var adminController = require('../controllers/adminController');

// GET
router.get('/', function(req, res) {
    res.render('menuAdmin', { title: 'Menú', msg: '' });
});

router.get('/createUserAdmin', function(req, res) {
    res.render('createUserAdmin', { title: 'Crear usuario', errors: [] });
});

router.get('/updateUserAdmin', function(req, res) {
    res.render('updateUserAdmin', { title: 'Modificar usuario', users: [], errors: [] });
});

router.get('/updateUserAdmin/update/:id', adminController.findToUpdate);

router.get('/deleteUserAdmin', function(req, res) {
    res.render('deleteUserAdmin', { title: 'Eliminar usuario', users: [], errors: [] });
});

router.get('/deleteUserAdmin/delete/:id', adminController.delete);

router.get('/findUserAdmin', function(req, res) {
    res.render('findUserAdmin', { title: 'Buscar usuario', users: [], errors: [] });
});

// POST
router.post('/createUserAdmin', adminController.createUser);
router.post('/updateUserAdmin', adminController.updateUser);
router.post('/updateUserAdmin/update', adminController.update);
router.post('/deleteUserAdmin', adminController.deleteUser);
router.post('/findUserAdmin', adminController.findUser);

module.exports = router;