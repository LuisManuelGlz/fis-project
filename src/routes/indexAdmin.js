var express = require('express');
var router = express.Router();

var passport = require('passport');

var adminController = require('../controllers/adminController');

// GET
router.get('/', function(req, res) {
    res.redirect('/indexAdmin/menuAdmin');
});

router.get('/superLogIn', function(req, res) {
    res.render('superLogIn', { title: 'Iniciar sesión', message: req.flash('logInMessage') });
});

router.get('/menuAdmin', isAdminAuthenticated, function(req, res) {
    res.render('menuAdmin', { title: 'Menú', msg: '' });
});

router.get('/menuAdmin/createUserAdmin', isAdminAuthenticated, function(req, res) {
    res.render('createUserAdmin', { title: 'Crear usuario', errors: [] });
});

router.get('/menuAdmin/updateUserAdmin', isAdminAuthenticated, function(req, res) {
    res.render('updateUserAdmin', { title: 'Modificar usuario', users: [], errors: [] });
});

router.get('/menuAdmin/updateUserAdmin/update/:id', adminController.findToUpdate);

router.get('/menuAdmin/deleteUserAdmin', isAdminAuthenticated, function(req, res) {
    res.render('deleteUserAdmin', { title: 'Eliminar usuario', users: [], errors: [] });
});

router.get('/menuAdmin/deleteUserAdmin/delete/:id', isAdminAuthenticated, adminController.delete);

router.get('/menuAdmin/findUserAdmin', isAdminAuthenticated, function(req, res) {
    res.render('findUserAdmin', { title: 'Buscar usuario', users: [], errors: [] });
});

router.get('/menuAdmin/logOut', function(req, res) {
    req.logout();
    res.redirect('/indexAdmin/superLogIn');
});

function isAdminAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        console.log('hola');
        return next();
        
    } // end if
    console.log('adios');
    
    res.redirect('/indexAdmin/superLogIn');
} // end isAuthenticate

// POST
router.post('/superLogIn', passport.authenticate('local-login-admin', {
    successRedirect: '/indexAdmin/menuAdmin',
    failureRedirect: '/indexAdmin/superLogIn',
    passReqToCallback: true
}));
router.post('/menuAdmin/createUserAdmin', adminController.createUser);
router.post('/menuAdmin/updateUserAdmin', adminController.updateUser);
router.post('/menuAdmin/updateUserAdmin/update', adminController.update);
router.post('/menuAdmin/deleteUserAdmin', adminController.deleteUser);
router.post('/menuAdmin/findUserAdmin', adminController.findUser);

module.exports = router;