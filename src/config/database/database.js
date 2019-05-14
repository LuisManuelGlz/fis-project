var mongoose = require('mongoose');

var URI = 'mongodb://localhost/fis-app-db';

mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(function() {
    console.log('Database is connected :D');
})
.catch(function(err) {
    console.log('Database error: ' + err);
});

module.exports = mongoose;