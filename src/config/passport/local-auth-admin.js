var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Admin = require('../../models/admin');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, user) {
            done(err, user);
    });
});

passport.use('local-login-admin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    Admin.findOne({ username }, function(err, userAdmin) {
        if (err) {
            return done(err);
        } // end if
        
        if (!userAdmin) {
            return done(null, false, req.flash('logInMessage', 'El administrador ' + username + ' no existe'));
        } // end if

        if (userAdmin.password != password) {
            return done(null, false, req.flash('logInMessage', 'Contraseña incorrecta'));
        } // end if
        // if (!user.compareEncryptedPasswordWithUserPassword(password)) {
        //     return done(null, false, req.flash('logInMessage', 'Contraseña incorrecta'));
        // } // end if
        
        done(null, userAdmin);
    }); // end findOne
}));