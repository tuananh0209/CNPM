const express = require('express');
const controller = require('../controllers/error.controller')

var router = express.Router();



// router.get('/cookie', function(req , res , next){
//     res.cookie('user-id', 12345);
//     res.send();
// })

router.get('/errors', controller.errors);

router.get('/:id' , controller.fixError);

module.exports = router