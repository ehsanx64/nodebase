var mongoose = require('mongoose')

try {
    mongoose.connect("mongodb://root:example@172.26.0.2/mydb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (err) {

}

module.exports = mongoose.connection;