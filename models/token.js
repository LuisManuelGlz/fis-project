var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tokenSchema = {
    _userId : { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
    token : { type: String, require: true }
};

var tokenData = new Schema(tokenSchema);
var token = mongoose.model('Token', tokenData);

module.exports = token;