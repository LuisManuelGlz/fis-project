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
    
    User.findOne({ email }, function(err, user) {
        if (user) {
            errors.push('El correo introducido ya existe.');
            return res.status(400).render('createUserAdmin', { 
                title: 'Crear usuario', 
                errors
            });
        } // end if

        // creamos y guardamos el usuario
        user = new User({ name: req.body.name, email: req.body.email, isVerified: true, password: req.body.password });
        user.save(function(err) {
            if (err) {
                errors.push(err);
                return res.status(500).render('errors', {
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
    // var { name, email, password } = req.body;
    // var errors = [];
    
    // if (!name) {
    //     errors.push('Por favor, escribe un nombre.');
    // } // end if

    // if (!email) {
    //     errors.push('Por favor, escribe un correo.');
    // } // end if

    // if (!password) {
    //     errors.push('Por favor, escribe una contraseña.');
    // } // end if

    // console.log('Estos son', errors);
    // if (errors.length > 0) {
    //     return res.render('createUserAdmin', {
    //         title: 'Crear usuario',
    //         errors
    //     });
    // } // end if

    User.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name, email: req.body.email, password: req.body.password }, function(err, user) {
        if (!user) {
            return res.status(400).send({ msg: 'El id no existe.' });
        } // end if

        res.send({ msg: 'Un usuario ha sido actualizado\n\n' + user });
    }); // end findOne
}; // end updateUser

// eliminar usuario
AdminController.deleteUser = function(req, res) {
    var name = req.body.name;
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

    User.find({ name }, function(err, users) {
        if (err) {
            return res.send(err);
        } // end if

        if (users == []) {
            errors.push('El correo no existe.')
      
            return res.status(400).render('deleteUserAdmin', {
                title: 'Eliminar usuario',
                users,
                errors
            });
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
    var name = req.body.name;
    var errors = [];

    // si el admin no escribe algo
    if (!name) {
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
    User.find({ name }, function(err, users) {
        if (err) {
            return res.send(err);
        } // end if
        
        // if (users == []) {
        //     console.log('Entró');
        //     errors.push('El usuario no existe');
        //     return res.render('findUserAdmin', {
        //         title: 'Buscar usuario',
        //         users,
        //         errors
        //     });
        // } // end if

        res.render('findUserAdmin', {
            title: 'Buscar usuario',
            users,
            errors
        });
    });
}; // end findUSer

module.exports = AdminController;