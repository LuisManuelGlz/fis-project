var User = require('../models/user');

var UserController = {};

UserController.useTemplate = function(req, res) {
    res.render('signUp', {});
};

UserController.createUser = function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            console.log('Error saving user');
        } else {
            console.log('User saved successfully: ' + user);
        } // end if
    }); // end save
    res.redirect('/');
}; // end createUser

module.exports = UserController;