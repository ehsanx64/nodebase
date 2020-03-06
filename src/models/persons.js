var mongoose = require('mongoose');

module.exports = mongoose.model('Persons', {
    name: String,
    age: Number
});
