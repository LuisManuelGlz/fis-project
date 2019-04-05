var express = require('express');
var router = express.Router();

var passport = require('passport');

var userController = require('../controllers/userController');

// GET
router.get('/', function(req, res) {
  res.render('indexUser', { title: 'Inicio', msg: '' });
});

router.get('/logIn', function(req, res) {
  res.render('logIn', { title: 'Iniciar sesión', message: req.flash('logInMessage') });
});

router.get('/signUp', function(req, res) {
  res.render('signUp', { title: 'Registrarse', message: req.flash('signUpMessage') });
});

router.get('/userProfile', isAuthenticated, function(req, res) {
  res.render('userProfile', { title: 'Perfil' });
});

router.get('/logOut', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } // end if
  res.redirect('/logIn');
} // end isAuthenticate

// POST
router.post('/logIn', passport.authenticate('local-login', {
  successRedirect: '/userProfile',
  failureRedirect: '/logIn',
  passReqToCallback: true
}));

router.post('/signUp', passport.authenticate('local-signup', {
  successRedirect: '/userProfile',
  failureRedirect: '/signUp',
  passReqToCallback: true
}));

module.exports = router;
