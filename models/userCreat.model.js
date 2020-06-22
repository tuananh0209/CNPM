var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name = String,
    pass = String,
    phone = String,
    avatar = String,
});
var user = mongoose.model('user' , userSchema , 'user');

module.exports = user;