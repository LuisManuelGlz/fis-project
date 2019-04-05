var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var adminSchema = {
    username: String,
    password: String,
    type: { type: String, default: "admin" }
};

var adminData = new Schema(adminSchema);

adminData.type = 'admin';

var admin = mongoose.model('Admin', adminData);

module.exports = admin;