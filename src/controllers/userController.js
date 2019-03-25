var crypto = require('crypto');
var nodemailer = require('nodemailer');

var User = require('../models/user');
var Token = require('../models/token');

var UserController = {};

// log-in del usuario
UserController.validateUser = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            return res.status(401).send({ msg: 'La dirección de correo ' + req.body.email + ' no está asociada con ninguna cuenta.' });
        } // end if

        if (req.body.password != user.password) {
            return res.status(401).send({ msg: 'Correo o contrasena inválidos.' });
        } // end if

        if (!user.isVerified) {
            return res.status(401).send({ msg: 'Tu cuenta no está verificada.' });
        } // end if

        res.send({ user: user.toJSON() });
        console.log('An user is log in\n\n' + user.name);
    });
}; // end validateUser

// sign-up del usuario
UserController.createUser = function(req, res) {
    var { name, email, password } = req.body;
    var errors = [];

    if (!name) {
        errors.push('Por favor, escribe un nombre.');
    } // end if

    if (!email) {
        errors.push('Por favor, escribe un correo.');
    } // end if

    if (!password) {
        errors.push('Por favor, escribe una contraseña.');
    } // end if

    if (errors.length > 0) {
        return res.render('signUp', {
            title: 'Registrarse',
            errors
        });
    } // end if

    // nos aseguramos de que no exista otra cuenta
    User.findOne({ email }, function (err, user) {
        if (user) { // si el usuario (cuenta) existe
            errors.push('El correo introducido ya existe.');
            return res.status(400).render('signUp', {
                title: 'Registrarse',
                errors
            });
        } // end if
    
        // Create and save the user
        user = new User({ name, email, password });
        user.save(function (err) {
            if (err) { 
                errors.push(err);
                return res.status(500).send({ 
                    title: 'Error',
                    errors 
                }); 
            }
    
            // crea un token verificado para este usuario
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    
            // guarda el token verificado
            token.save(function (err) {
                if (err) { 
                    return res.status(500).send({ msg: err.message }); 
                } // end if
    
                // crea detalles del correo (crea correo vaya)
                var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: "fis.app19@gmail.com", pass: "thisismysecret1084" } });
                var mailOptions = { from: 'contact@fisapp.com', to: user.email, subject: 'Verificación de correo', text: 'Hola!\n\n' + 'Por favor verifica tu cuanta dando click al link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n\n\nNo te preocupes, no es virus :D' };
                
                // envía correo
                transporter.sendMail(mailOptions, function (err) {
                    if (err) {
                        return res.status(500).send({ msg: err.message }); 
                    } // end if
                    res.status(200).send('Una verificación ha sido enviada a ' + user.email + '.');
                    // res.redirect('/');
                }); // end sendMail
            }); // end save
            console.log('\nUser inserted:\n\n' + user + '\n');
        }); // end save
    }); // findOne
}; // end createUser

// verificación (token)
UserController.confirmation = function(req, res, next) {
    var tokenUrl = req.originalUrl;
    var partsTokenUrl = tokenUrl.split('/');
    var tokenUser = partsTokenUrl[2];

    // nos aseguramos de que exista el token
    Token.findOne({ token: tokenUser }, function(err, token) {
        if (!token) {
            return res.status(400).send({ type: 'not-verified', msg: 'No se ha podido encontrar el token. Tu token ha expirado.' });
        } // end if

        // si encontramos un token, encontramos un usuario
        User.findOne({ _id: token._userId }, function(err, user) {
            if (!user) {
                return res.status(400).send({ msg : 'No se ha podido encontrar un usuario para este token.' });
            } // end if
            if (user.isVerified) {
                return res.status(400).send({ type: 'already-verified', msg: 'Este usuario ya ha sido verificado.' });
            } // end if
 
            // verificar y guardar usuario
            user.isVerified = true;
            user.save(function (err) {
                if (err) { 
                    return res.status(500).send({ msg: err.message }); 
                } // end if
                res.status(200).send({ msg: "La cuenta ha sido verificada. Por favor, inicia sesión." });
            });
        }); // end findOne
    }); // end findOne
}; // end confirmation

module.exports = UserController;