var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../../models/user');
var Admin = require('../../models/admin');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    if (user.type == 'user') { // se pierde la serialización <-- importante
        User.findById(user._id, function(err, user) {
            return done(err, user);
        });
    } else {
        Admin.findById(user._id, function(err, user) {    
            return done(err, user);
        });
    } // end if
});

// USER
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({ email })
        .then(function(user) {
            if (user) {
                return done(null, false, req.flash('signUpMessage', 'El correo introducido ya existe'));
            }
            
            var newUser = new User({});
            newUser.name = req.body.name;
            newUser.email = email;
            newUser.password = newUser.generateNewEncryptPassword(password);

            newUser.save(function() {
                return done(null, newUser);
            });
        })
        .catch(function(err) {
            return done(err);
        });
    }));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({ email })
        .then(function(user) {
            if (!user) {
                return done(null, false, req.flash('logInMessage', 'El usuario ' + email + ' no existe'));
            }

            if (!user.compareEncryptedPasswordWithUserPassword(password)) {
                return done(null, false, req.flash('logInMessage', 'Contraseña incorrecta'));
            }

            return done(null, user);
        })
        .catch(function(err) {
            return done(err);
        });
}));

// ADMIN
passport.use('local-login-admin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    Admin.findOne({ username })
        .then(function(userAdmin) {
            if (!userAdmin) {
                return done(null, false, req.flash('logInMessage', 'El administrador ' + username + ' no existe'));
            }

            if (userAdmin.password != password) {
                return done(null, false, req.flash('logInMessage', 'Contraseña incorrecta'));
            }

            return done(null, userAdmin);
        })
        .catch(function(err) {
            return done(err);
        });
}));