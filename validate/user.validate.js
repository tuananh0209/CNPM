module.exports.postCreat = function(req , res , next){
    var non_input = [];
    
    if (!req.body.name){
        non_input.push("Name is require!");
    }

    if (!req.body.phone) {
        non_input.push("Phone is require!");
    }

    if (!req.body.pass) {
        non_input.push("Password is require!");
    }
   
    if (non_input.length) {
        res.render('users/creat',{
            request : non_input,
            value : req.body
        });
        return;
    }
    next();
}

