const db = require('../db')
// const userCreat = require('../models/userCreat.model');
const shortid = require('shortid')
const md5 = require('md5')
const userCreat = require('../objects/userCreat.object');
const { use } = require('../router/auth.router');


module.exports.login = function(req , res){
    res.render('auth/login');
};

module.exports.postLogin = function(req , res){
    var userName = req.body.name;   
    var user = db.get('users').find({ name : userName}).value();

    res.cookie('userId', user.id, {
        signed : true
    });
    res.redirect('/users');

}

module.exports.signOut = function(req , res){
    var user = db.get('users').find({
        id: req.signedCookies.userId
    }).value();
    res.clearCookie('userId');
    res.redirect('login');
}

module.exports.creat = function (req, res) {
    console.log(req.cookies);
    res.render('auth/creat');
};

module.exports.postCreat = function (req, res) {
    var id = md5(req.body.pass);
    var inData = new userCreat(
        req.body.name,
        id,
         req.body.phone,
        req.file.path.slice(7)
    )
    db.get('users').push(inData)
        .write();
    res.redirect('login');
};