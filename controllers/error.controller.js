const errorData = require('../models/error.model')

module.exports.errors = async function (req, res) {
    await errorData.find({

    }, function(err , data){
        if (err) console.log(err);
        try{
            console.log(data[0].content);
            res.render('error/errors',{
                error : data
            });

        }
        catch(err){
            console.log(err);
            res.redirect('/')
        }
    })
}

module.exports.fixError = async function(req , res){
    var id = req.params.id
    await errorData.findOneAndDelete({
        _id : id
    }, function(err){
        if (err) console.log(err);
        res.redirect('errors');
    })
}