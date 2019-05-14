var Admin = require('../models/admin');
var User = require('../models/user');

var AdminController = {};

// crear usuario
AdminController.createUser = function(req, res) {
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
        return res.render('createUserAdmin', {
            title: 'Crear usuario',
            errors
        });
    } // end if
    
    User.findOne({ email })
        .then(function(user) {
            if (user) {
                errors.push('El usuario introducido ya existe.');
                return res.status(400).render('createUserAdmin', { 
                    title: 'Crear usuario', 
                    errors
                });
            }

            // creamos y guardamos el usuario
            newUser = new User({});
            newUser.name = name;
            newUser.email = email;
            newUser.password = newUser.generateNewEncryptPassword(password);
            
            return newUser.save();
        }).then(function() {
            res.render('menuAdmin', {
                title: 'Menú',
                msg: 'Usuario creado correctamente.'
            });

            console.log('\nUser inserted:\n\n' + newUser + '\n');
        })
        .catch(function(err) {
            if (err) {
                errors.push(err);
                return res.status(500).send('errors', {
                    title: 'Error',
                    errors
                });
            }
        });
}; // end createUser

// actualizar usuario
AdminController.updateUser = function(req, res) {
    var { name } = req.body;
    var errors = [];
    
    if (!name) {
        errors.push('Por favor, escribe un nombre.');
    } // end if

    if (errors.length > 0) {
        return res.render('updateUserAdmin', {
            title: 'Modificar usuario',
            users: [],
            errors
        });
    } // end if

    User.find({ name })
        .then(function(users) {
            res.render('updateUserAdmin', {
                title: 'Modificar usuario',
                users,
                errors
            });
        })
        .catch(function(err) {
            return res.send(err);
        });
}; // end updateUser

AdminController.findToUpdate = function(req, res) {
    var id = req.params.id;
    
    User.findById({ _id: id })
        .then(function(user) {
            res.render('update', {
                title: 'Modificar usuario',
                id: user._id,
                name: user.name,
                email: user.email,
                errors: []
            });
        })
        .catch(function(err) {
            return res.send(err);
        });
}; // end update

AdminController.update = function(req, res) {
    var { id, name, email, password } = req.body;
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
        return res.render('update', {
            title: 'Modificar usuario',
            id,
            name,
            email,
            errors
        });
    } // end if
    
    User.findById({ _id: id })
        .then(function(user) {
            password = user.generateNewEncryptPassword(password);

            return User.findByIdAndUpdate({ _id: id }, { name, email, password });
        })
        .then(function() {
            res.render('menuAdmin', {
                title: 'Menú',
                msg: 'Usuario modificado correctamente'
            });

            console.log('\n\nUser updated: ' + user._id + '\n\n');
        })
        .catch(function(err) {
            return res.send(err);
        });

} // end update

// eliminar usuario
AdminController.deleteUser = function(req, res) {
    var { name } = req.body;
    var errors = [];

    if (!name) {
        errors.push('Por favor, escribe un nombre.');
    } // end if

    if (errors.length > 0) {
        return res.render('deleteUserAdmin', {
            title: 'Eliminar usuario',
            users: [],
            errors
        });
    } // end if

    User.find({ name })
        .then(function(users) {
            res.render('deleteUserAdmin', {
                title: 'Eliminar usuario',
                users,
                errors
            });
        })
        .catch(function(err) {
            return res.send(err);
        });
}; // end deleteUser

AdminController.delete = function(req, res) {
    var id = req.params.id;

    User.remove({ _id: id })
        .then(function() {
            res.redirect('/indexAdmin/menuAdmin');
            console.log('\n\nUser deleted: ' + id + '\n\n')
        }).catch(function(err) {
            return res.send(err);
        });
} // end delete

// buscar usuario
AdminController.findUser = function(req, res) {
    var { name } = req.body;
    var errors = [];

    // si el admin no escribe algo
    if (!name) {
        User.find({ })
            .then(function(users) {
                res.render('findUserAdmin', {
                    title: 'Buscar usuario',
                    users,
                    errors
                });
            })
            .catch(function(err) {
                return res.send(err);
            });
    } // end if

    // si el admin escribe algo
    User.find({ name })
    .then(function(users) {
        res.render('findUserAdmin', {
            title: 'Buscar usuario',
            users,
            errors
        });
    })
    .catch(function(err) {
        return res.send(err);
    });
}; // end findUSer

module.exports = AdminController;