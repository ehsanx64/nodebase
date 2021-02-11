var mongoose = require('mongoose')

try {
    mongoose.connect("mongodb://172.22.0.2:27017/mydb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (err) {
    console.log('Mongoose connect error' + err);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', function () {
    console.log('Database is open');
})

module.exports = db;