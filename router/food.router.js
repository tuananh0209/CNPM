const express = require('express');
const validate = require('../validate/food.validate')
const validateAuth = require('../validate/auth.validate')
const multer = require('multer')
var router = express.Router();

const controller = require('../controllers/food.controller')
const upload = multer({dest : "./public/img/product"})

router.get('/food',  controller.foodList)

// router.get('/cookie', function(req , res , next){
//     res.cookie('user-id', 12345);
//     res.send();
// })

router.get('/creat', controller.creat);

router.get('/search', controller.search);

router.post('/creat', upload.single('avatar'), validate.postCreat, controller.postCreat);

router.get('/errors', controller.errors);

router.get('/:id', controller.edit);

router.post('/update', upload.single('avatar'), validate.postCreat, controller.update);


module.exports = router 