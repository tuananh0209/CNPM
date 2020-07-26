const express = require('express');
const validate = require('../validate/food.validate')
const multer = require('multer')
var router = express.Router();

const controller = require('../controllers/food.controller')
const upload = multer({dest : "./public/img/product"})

router.get('/food',  controller.foodList)

router.get('/creat', controller.creat);

router.get('/search', controller.search);

router.post('/creat', upload.single('avatar'), validate.postCreat, controller.postCreat);

router.get('/errors', controller.errors);

router.get('/:id', controller.edit);

router.post('/update', upload.single('avatar'), validate.postCreat, controller.update);

module.exports = router 