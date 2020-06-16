const express = require('express');
const validate = require('../validate/user.validate')
const validateAuth = require('../validate/auth.validate')
const multer = require('multer')
var router = express.Router();

const controller = require('../controllers/user.controller')
const upload = multer({dest : "./public/image"})

router.get('/',  controller.index)

// router.get('/cookie', function(req , res , next){
//     res.cookie('user-id', 12345);
//     res.send();
// })

router.get('/search', controller.search)

router.get('/creat', controller.creat)

router.post('/creat', upload.single('avatar') ,validate.postCreat , controller.postCreat);

router.get('/report', controller.report);

router.get('/errors', controller.errors);

router.get('/:id', controller.view);

router.get('/view/:id', controller.viewOrders);


module.exports = router