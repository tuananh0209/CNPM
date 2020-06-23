module.exports.postCreat = function(req , res , next){
    var non_input = [];
    
    if (!req.body.name){
        non_input.push("Name is require!");
    }

    if (!req.body.price) {
        non_input.push("Price is require!");
    }

    if (!req.body.vendor) {
        non_input.push("Vendor is require!");
    }
   
    if (non_input.length) {
        res.render('food/creat',{
            request : non_input,
            value : req.body
        });
        return;
    }
    next();
}

