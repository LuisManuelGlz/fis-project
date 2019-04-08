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
    // hash de 10 vueltas, entre más vueltas dé, más lenta será la autenticación
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}; // end encryptPassword

userData.methods.compareEncryptedPasswordWithUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}; // compare Password

var user = mongoose.model('User', userData);

module.exports = user;