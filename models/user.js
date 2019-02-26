var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = {
    name : String,
    email : String,
    password : String
};

var usarData = new Schema(userSchema);
var user = mongoose.model('User', usarData);

module.exports = user;