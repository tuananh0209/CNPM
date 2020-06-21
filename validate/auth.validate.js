const db = require('../db')
const md5 = require('md5')

module.exports.postLogin = function(req , res , next){
    var userName = req.body.name;
    var pass = req.body.pass;
    
    var user = db.get('users').find({ name : userName}).value();
    var error = [];
   

       if (!user) {
           res.render('auth/login', {
               error: [
                   'Name does not exist!'
               ],
               value: req.body
           });
           return;
       }

       if (user.pass !== md5(pass)) {
           res.render('auth/login', {
               error: [
                   'Wrong password!'
               ],
               value: req.body
           });
           return;
       }
    next();
}

module.exports.requestAuth = function(req , res , next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({id: req.signedCookies.userId}).value();

    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}

module.exports.postCreat = function (req, res, next) {
    var non_input = [];

    if (!req.body.name) {
        non_input.push("Name is require!");
    }

    if (!req.body.phone) {
        non_input.push("Phone is require!");
    }

    if (!req.body.pass) {
        non_input.push("Password is require!");
    }

    if (non_input.length) {
        res.render('auth/creat', {
            request: non_input,
            value: req.body
        });
        return;
    }
    next();
}
