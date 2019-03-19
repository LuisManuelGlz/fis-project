var Admin = require('../models/admin');
var User = require('../models/user');

var AdminController = {};

AdminController.useMenuAdminTemplate = function(req, res, next) {
    res.render('menuAdmin', {});
}; // end useMenuAdminTemplate

AdminController.validateAdmin = function(req, res, next) {
    Admin.findOne({ username: req.body.email }, function(err, admin) {
        if (!admin) {
            return res.status(401).send({ msg: 'El nombre de usuario no existe.' });
        } // end if

        if (req.body.password != admin.password) {
            return res.status(401).send({ msg: 'Usuario o contraseña son inválidos.' })
        } // end if

        res.render('menuAdmin', {});
    }); // end findOne
}; // end validateAdmin

AdminController.useCreateUserTemplate = function(req, res, next) {
    res.render('createUserAdmin', {});
}; // end useCreateUserTemplate

AdminController.useUpdateUserTemplate = function(req, res, next) {
    res.render('updateUserAdmin', {});
}; // end useCreateUserTemplate

AdminController.useDeleteUserTemplate = function(req, res, next) {
    res.render('deleteUserAdmin', {});
}; // end useCreateUserTemplate

AdminController.useFindUserTemplate = function(req, res, next) {
    res.render('findUserAdmin', {});
}; // end useCreateUserTemplate


AdminController.createUser = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (user) {
            return res.status(400).send({ msg: 'El correo que has introducido ya está asociado con otra cuenta.' });
        } // end if

        // creamos y guardamos el usuario
        user = new User({ name: req.body.name, email: req.body.email, isVerified: true, password: req.body.password });
        user.save(function(err) {
            if (err) { 
                return res.status(500).send({ msg: err.message }); 
            } // end if
            res.status(200).send({ msg: 'Una verificación de correo ha sido enviada a ' + user.email + '.' } );

            console.log('User inserted:\n\n' + user);
        }); // end save
    }); // end findOne
}; // end createUser

AdminController.updateUser = function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
            return res.status(400).send({ msg: 'El correo no existe.' });
        } // end if

        res.render('formDataInsert', { name: user.name, email: user.email, password: user.password });
    }); // end findOne
}; // end updateUser

AdminController.deleteUser = function() {

}; // end deleteUser

AdminController.findUser = function() {

}; // end findUSer

module.exports = AdminController;