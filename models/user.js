var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = {
    name : String,
    email : { type : String, unique : true },
    isVerified : { type : Boolean, default : false },
    password : String
};

var usarData = new Schema(userSchema);
var user = mongoose.model('User', usarData);

module.exports = user;