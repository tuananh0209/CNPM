// const db = require('../db')
const userMatchObject = require('../objects/userManage.object');
const userManage = require('../models/userCreat.model');

const md5 = require('md5')

module.exports.postLogin = async function(req , res , next){
    var userName = req.body.name;
    var pass = req.body.pass;
    var user;

    await userManage.find({
        name: req.body.name
    }, function(err, data) {
        
        if (err) {
            if (err) return next(err);
        }
        try {
        user = new userMatchObject(data[0].name , data[0]._id , data[0].pass , data[0].vendor);
        }
        catch(err) {
        res.redirect('/auth/login');
        }
    }).then(function(){
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
    })


}

module.exports.requestAuth = async function(req , res , next){
   
    var id = req.signedCookies.userId;
    if(!id){
        res.redirect('/auth/login');
        return; 
    }
    // res.locals.user = user;

    
    var user;

    await userManage.find({
        _id : id
    }, function (err, data) {

        if (err) {

            if (err) console.log(err);
        }
        try{
            user = new userMatchObject(data[0].name, data[0]._id, data[0]._pass, data[0].vendor);
        }
        catch(err){
            console.log(err);
            res.redirect('/auth/login');

        } 
    })
    
    setTimeout(function () {
        if (!user) {
            
            res.redirect('/auth/login');
            return;
        }
        res.locals.user = user;
        next();
    } , 1000);
    
}


module.exports.postCreat = function (req, res, next) {
    var non_input = [];

    if (!req.body.name) {
        non_input.push("Name is require!");
    }

    if (!req.body.vendor) {
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
