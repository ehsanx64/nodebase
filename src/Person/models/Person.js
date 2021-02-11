var mongoose = require('mongoose');
// var db = require('../../db');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Person', PersonSchema, 'person');
