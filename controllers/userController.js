var crypto = require('crypto');
var nodemailer = require('nodemailer');

var User = require('../models/user');
var Token = require('../models/token')

var UserController = {};

UserController.useTemplate = function(req, res, next) {
    res.render('signUp', {});
}; // end useTamplate

UserController.createUser = function(req, res, next) {
    // req.assert('name', 'El nombre no puede quedar vacío').notEmpty();
    // req.assert('email', 'El correo no es válido').isEmail();
    // req.assert('email', 'El correo no puede quedar vacío').notEmpty();
    // req.assert('password', 'La contraseña debe de tener al menos 4 caracteres').len(4);
    // req.sanitize('email').normalizeEmail({ remove_dots: false });
    
    // // verificación de errores    
    // var errors = req.validationErrors();
    // if (errors) { 
    //     // res.redirect('/confirmation');
    //     // return res.status(400).redirect('/confirmation');
    //     return res.status(400).send(errors); 
    // } // end if
    
    // nos aseguramos de que no exista otra cuenta
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user) { // si el usuario (cuenta) existe
            return res.status(400).render('confirmation', { msg: 'El correo que has introducido ya está asociado con otra cuenta.' });
        } // end if
    
        // Create and save the user
        user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
        user.save(function (err) {
            if (err) { return res.status(500).render('confirmation', { msg: err.message }); }
    
            // crea un token verificado para este usuario
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    
            // guarda el token verificado
            token.save(function (err) {
                if (err) { 
                    return res.status(500).render('confirmation', { msg: err.message }); 
                } // end if
    
                // envia correo
                var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: "fis.app19@gmail.com", pass: "thisismysecret1084" } });
                var mailOptions = { from: 'contact@fisapp.com', to: user.email, subject: 'Verificación de correo', text: 'Hola!\n\n' + 'Por favor verifica tu cuanta dando click al link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n\n\nNo te preocupes, no es virus :D' };
                
                transporter.sendMail(mailOptions, function (err) {
                    if (err) { 
                        return res.status(500).render('confirmation', { msg: err.message}); 
                    } // end if
                    res.status(200).render('confirmation', { msg: 'Una verificación de correo ha sido enviada a ' + user.email + '.' } );
                }); // end sendMail
            }); // end save
        }); // end save
    }); // findOne
}; // end createUser

UserController.confirmation = function(req, res, next) {
    var tokenUrl = req.originalUrl;
    var partsTokenUrl = tokenUrl.split('/');
    var tokenUser = partsTokenUrl[2];

    // nos aseguramos de que exista el token
    Token.findOne({ token : tokenUser }, function(err, token) {
        if (!token) {
            return res.status(400).render('confirmation', { type : 'not-verified', msg : 'No se ha podido encontrar el token. Tu token ha expirado.' });
        } // end if

        // si encontramos un token, encontramos un usuario
        User.findOne({ _id: token._userId }, function(err, user) {
            if (!user) {
                return res.status(400).render('confirmation', { msg : 'No se ha podido encontrar un usuario para este token.' });
            } // end if
            if (user.isVerified) {
                return res.status(400).render('confirmation', { type: 'already-verified', msg: 'Este usuario ya ha sido verificado.' });
            } // end if
 
            // verificar y guardar usuario
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).render('confirmation', { msg: err.message }); }
                res.status(200).render('confirmation', { msg: "La cuenta ha sido verificada. Por favor, inicia sesión." });
            });
        }); // end findOne
    }); // end findOne
}; // end confirmation

module.exports = UserController;