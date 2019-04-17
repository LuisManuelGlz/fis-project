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

router.get('/menuAdmin/updateUserAdmin/update/:id', isAdminAuthenticated, adminController.findToUpdate);

router.get('/menuAdmin/deleteUserAdmin', isAdminAuthenticated, function(req, res) {
    res.render('deleteUserAdmin', { title: 'Eliminar usuario', users: [], errors: [] });
});

router.get('/menuAdmin/deleteUserAdmin/delete/:id', isAdminAuthenticated, adminController.delete);

router.get('/menuAdmin/findUserAdmin', isAdminAuthenticated, function(req, res) {
    res.render('findUserAdmin', { title: 'Buscar usuario', users: [], errors: [] });
});

router.get('/menuAdmin/freeComputersAdmin', isAdminAuthenticated, function(req, res) {
    res.render('freeComputersAdmin', {title: 'Equipos disponibles', screenColor: 'gray'});
});

router.get('/menuAdmin/logOut', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isAdminAuthenticated(req, res, next) {
    if(req.isAuthenticated() && req.user.type == 'admin') {
        return next();
    } // end if
    res.redirect('/indexAdmin/superLogIn');
} // end isAdminAuthenticate

// POST
router.post('/superLogIn', passport.authenticate('local-login-admin', {
    // session: false,
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