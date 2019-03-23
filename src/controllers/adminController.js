var Admin = require('../models/admin');
var User = require('../models/user');

var AdminController = {};

// 
// plantillas
// 

// uso de la plantilla
AdminController.useMenuAdminTemplate = function(req, res) {
    res.render('menuAdmin', {});
}; // end useMenuAdminTemplate

// uso de la plantilla createUserAdmin
AdminController.useCreateUserTemplate = function(req, res) {
    res.render('createUserAdmin', {});
}; // end useCreateUserTemplate

// uso de la plantilla updateUserAdmin
AdminController.useUpdateUserTemplate = function(req, res) {
    res.render('updateUserAdmin', {});
}; // end useCreateUserTemplate

// uso de la plantilla deleteUserAdmin
AdminController.useDeleteUserTemplate = function(req, res) {
    res.render('deleteUserAdmin', {});
}; // end useCreateUserTemplate

// uso de la plantilla findUserAdmin
AdminController.useFindUserTemplate = function(req, res) {
    res.render('findUserAdmin', {});
}; // end useCreateUserTemplate

// log-in del admin
AdminController.validateAdmin = function(req, res) {
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

// 
// CRUD
// 

// crear usuario
AdminController.createUser = function(req, res) {
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

// actualizar usuario
AdminController.updateUser = function(req, res) {
    User.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name, email: req.body.email, password: req.body.password }, function(err, user) {
        if (!user) {
            return res.status(400).send({ msg: 'El id no existe.' });
        } // end if

        res.send({ msg: 'Un usuario ha sido actualizado\n\n' + user });
    }); // end findOne
}; // end updateUser

// eliminar usuario
AdminController.deleteUser = function(req, res) {
    User.findOneAndRemove({ email: req.body.email }, function(err, user) {
        if (!user) {
            return res.status(400).send({ msg: 'El correo no existe.' });
        } // end if

        res.send({ msg: 'Un usuario ha sido eliminado.\n\n' + user });
    });
}; // end deleteUser

// buscar usuario
AdminController.findUser = function(req, res) {

}; // end findUSer

module.exports = AdminController;