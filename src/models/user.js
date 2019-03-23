var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = {
    name: String,
    email: { type: String, unique: true },
    isVerified: { type: Boolean, default: false },
    password: String
};

var userData = new Schema(userSchema);
var user = mongoose.model('User', userData);

module.exports = user;