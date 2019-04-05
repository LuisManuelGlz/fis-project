var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = {
    name: String,
    email: { type: String, unique: true },
    password: String,
    type: { type: String, default: "user" }
};

var userData = new Schema(userSchema);

userData.methods.generateNewEncryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(16)); // hash de 16 vueltas
}; // end encryptPassword

userData.methods.compareEncryptedPasswordWithUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}; // compare Password

var user = mongoose.model('User', userData);

module.exports = user;