var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var adminSchema = {
    username: { type: String, unique: true },
    password: String,
    type: { type: String, default: "admin" }
};

var adminData = new Schema(adminSchema);

adminData.methods.generateNewEncryptPassword = function(password) {
    // hash de 10 vueltas, entre más vueltas dé, más lenta será la autenticación
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}; // end encryptPassword

adminData.methods.compareEncryptedPasswordWithUserPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}; // compare Password

adminData.type = 'admin';

var admin = mongoose.model('Admin', adminData);

module.exports = admin;