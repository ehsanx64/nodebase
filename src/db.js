var mongoose = require('mongoose')

try {
    mongoose.connect("mongodb://172.17.0.2/mydb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (err) {

}

module.exports = mongoose.connection;