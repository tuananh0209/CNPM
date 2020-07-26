// const db = require('../db')
// const userCreat = require('../models/userCreat.model');
const shortid = require('shortid')
const md5 = require('md5')
const userMatch = require('../objects/userManage.object');
const { use } = require('../router/auth.router');
const userManage = require('../models/userCreat.model');


module.exports.login = function(req , res){
    res.render('auth/login');
};


module.exports.postLogin = async function(req , res){

    await userManage.find({
        name: req.body.name
    }, function(err , data){
        setTimeout(function(){
            console.log(data[0]._id);
            if(err) {
                if (err) return next(err);
            }
            res.cookie('userId', data[0]._id, {
                signed : true
            });
            res.redirect('/index');
        }, 100);
    })
}

module.exports.signOut = function(req , res){
 
    res.clearCookie('userId');
    res.redirect('login');
}

module.exports.creat = function (req, res) {
 
    res.render('auth/creat');
};

module.exports.postCreat =async function (req, res) {
    
    var userInData = new userManage({
        name : req.body.name,
        pass: md5(req.body.pass),
        vendor:req.body.vendor
    });

    await userInData.save(function (err) {
        if (err){
            console.log(err);
        }

        res.redirect('login');  
    })
}; 