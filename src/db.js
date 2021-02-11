var util = require('util');
var mongoose = require('mongoose'); 
var dotenv = require('dotenv');

dotenv.config();

const { 
    MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASS, MONGO_DB 
} = process.env;

try {
    mongoose.connect(util.format('mongodb://%s:%s@%s:%s/%s',
        MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DB
    ), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin'
    });
} catch (err) {
    console.log('Mongoose connect error' + err);
}

var db = mongoose.connection;
db.on('error', () => {
    console.error.bind(console, 'mongodb connection error')
});
db.once('open', function () {
    console.log('Database is open');
})

module.exports = db;