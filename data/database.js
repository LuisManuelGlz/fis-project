var mongoose = require('mongoose');

var URI = 'mongodb://localhost/fis-app-db';

mongoose.connect(URI, function(err) {
    if (err) {
        console.log('Database error: ' + err);
    } else {
        console.log('Database is connected :D');
    } // end if
}); // end connect

module.exports = mongoose;