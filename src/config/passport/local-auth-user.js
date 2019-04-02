var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({ email }, function(err, user) {
        if (err) {
            return done(err);
        } // end if
        
        if (user) {
            return done(null, false, req.flash('signUpMessage', 'El correo introducido ya existe'));
        } // end if

        var newUser = new User({});
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.password = newUser.generateNewEncryptPassword(password);
        console.log(newUser);
    
        newUser.save(function(err) {
            if (err) {
                throw err;
            } // end if
    
            return done(null, newUser);
        }); // end save
    }); // end findOne
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    User.findOne({ email }, function(err, user) {
        if (err) {
            return done(err);
        } // end if
        
        if (!user) {
            return done(null, false, req.flash('logInMessage', 'El usuario ' + email + ' no existe'));
        } // end if

        if (!user.compareEncryptedPasswordWithUserPassword(password)) {
            return done(null, false, req.flash('logInMessage', 'Contraseña incorrecta'));
        } // end if
        
        done(null, user);
    }); // end findOne
}));