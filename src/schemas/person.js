var mongoose = require('mongoose');

module.exports = mongoose.model('person', {
    name: String,
    age: Number
});