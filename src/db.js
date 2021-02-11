var mongoose = require('mongoose'); 
var dotenv = require('dotenv');

dotenv.config();

const { MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASS } = process.env;

try {
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/mydb`, {
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