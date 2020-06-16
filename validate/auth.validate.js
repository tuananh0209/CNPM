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