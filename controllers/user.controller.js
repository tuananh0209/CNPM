var db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')



module.exports.index = function (req, res) {
    res.render('users/users', {
        users: db.get('users').value()
    })
};

module.exports.search = function (req, res) {
    var name = req.query.q;
    var userMatched = db.get('users').value().filter(function (value) {
        return value.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('users/users', {
        users: userMatched,
        inputs: name 
    });

};

module.exports.creat = function (req, res) {
    console.log(req.cookies);
    res.render('users/creat');
};

 module.exports.postCreat = function (req, res) {
    req.body.id = shortid.generate();
    var inData = {
        name : req.body.name,
        id : req.body.id,
        pass : md5(req.body.pass),
        phone : req.body.phone,
        avatar : req.file.path.slice(7)
    }
    db.get('users').push(inData)
         .write();
    res.redirect('/users');
};

module.exports.view = function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    console.log(id);
    console.log(user);

    res.render('users/view', {
        users: user
    });
};

module.exports.report = function (req, res) {
    res.render('users/report');
}

module.exports.errors = function (req, res) {
    res.render('users/errors');
}

module.exports.viewOrders = function (req, res){
    res.render('users/viewOrders');
}