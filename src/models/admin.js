var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = {
    username: String,
    password: String
};

var adminData = new Schema(adminSchema);
var admin = mongoose.model('Admin', adminData);

module.exports = admin;