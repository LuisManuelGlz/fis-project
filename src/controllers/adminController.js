var Admin = require('../models/admin');
var User = require('../models/user');

var AdminController = {};

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
    var { email, password } = req.body;
    var errors = [];

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
    
    User.findOne({ email }, function(err, user) {
        if (user) {
            errors.push('El usuario introducido ya existe.');
            return res.status(400).render('createUserAdmin', { 
                title: 'Crear usuario', 
                errors
            });
        } // end if

        // creamos y guardamos el usuario
        user = new User({ email, password });
        user.save(function(err) {
            if (err) {
                errors.push(err);
                return res.status(500).send('errors', {
                    title: 'Error',
                    errors
                });
            } // end if
            res.render('menuAdmin', {
                title: 'Menú',
                msg: 'Usuario creado correctamente.'
            });

            console.log('\nUser inserted:\n\n' + user + '\n');
        }); // end save
    }); // end findOne
}; // end createUser

// actualizar usuario
AdminController.updateUser = function(req, res) {
    var { email } = req.body;
    var errors = [];
    
    if (!email) {
        errors.push('Por favor, escribe un correo.');
    } // end if

    if (errors.length > 0) {
        return res.render('updateUserAdmin', {
            title: 'Modificar usuario',
            users: [],
            errors
        });
    } // end if

    User.find({ email }, function(err, users) {
        if (err) {
            return res.send('errors', err);
        } // end if

        res.render('updateUserAdmin', {
            title: 'Modificar usuario',
            users,
            errors
        });
    });
}; // end updateUser

AdminController.findToUpdate = function(req, res) {
    var id = req.params.id;
    console.log(id);
    
    User.findById({ _id: id }, function(err, user) {
        if (err) {
            return res.send(err);
        } // end if

        res.render('update', {
            title: 'Modificar usuario',
            id: user._id,
            email: user.email,
            errors: []
        });
    });
}; // end update

AdminController.update = function(req, res) {
    var { id, email, password } = req.body;
    var errors = [];
    
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
            email,
            errors
        });
    } // end if

    User.findByIdAndUpdate({ _id: id }, { email, password }, function(err, user) {
        if (err) {
            return res.send(err);
        } // end if

        res.render('menuAdmin', {
            title: 'Menú',
            msg: 'Usuario modificado correctamente'
        });

        console.log('\nUser updated:\n\n' + user + '\n');
    }); // end findByIdAbdUpdate
} // end update

// eliminar usuario
AdminController.deleteUser = function(req, res) {
    var { email } = req.body;
    var errors = [];

    if (!email) {
        errors.push('Por favor, escribe un correo.');
    } // end if

    if (errors.length > 0) {
        return res.render('deleteUserAdmin', {
            title: 'Eliminar usuario',
            users: [],
            errors
        });
    } // end if

    User.find({ email }, function(err, users) {
        if (err) {
            return res.send(err);
        } // end if

        res.render('deleteUserAdmin', {
            title: 'Eliminar usuario',
            users,
            errors
        });
    });
}; // end deleteUser

AdminController.delete = function(req, res) {
    var id = req.params.id;

    User.remove({ _id: id }, function() {
        res.redirect('/menuAdmin');

        // console.log('\nUser deleted:\n\n' + user + '\n')
    });
} // end delete

// buscar usuario
AdminController.findUser = function(req, res) {
    var { email } = req.body;
    var errors = [];

    // si el admin no escribe algo
    if (!email) {
        User.find({ }, function(err, users) {
            if (err) {
                return res.send(err);
            } // end if

            res.render('findUserAdmin', {
                title: 'Buscar usuario',
                users,
                errors
            });
        });
    } // end if

    // si el admin escribe algo
    User.find({ email }, function(err, users) {
        if (err) {
            return res.send(err);
        } // end if

        res.render('findUserAdmin', {
            title: 'Buscar usuario',
            users,
            errors
        });
    });
}; // end findUSer

module.exports = AdminController;