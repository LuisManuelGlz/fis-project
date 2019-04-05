var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../../models/user');
var Admin = require('../../models/admin');

var userType;

passport.serializeUser(function(user, done) {
    userType = user.type;
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {    
    if (userType == 'user') {
        User.findById(id, function(err, user) {
                return done(err, user);
        });
    } else {
        Admin.findById(id, function(err, user) {    
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

// ADMIN
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
            console.log('!userAdmin');
            
            return done(null, false, req.flash('logInMessage', 'El administrador ' + username + ' no existe'));
        } // end if

        if (userAdmin.password != password) {
            console.log('userAdmin.password');
            
            return done(null, false, req.flash('logInMessage', 'Contraseña incorrecta'));
        } // end if
        
        console.log('null, userAdmin');
        
        done(null, userAdmin);
    }); // end findOne
}));