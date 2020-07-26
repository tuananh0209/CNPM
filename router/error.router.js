const express = require('express');
const controller = require('../controllers/error.controller')

var router = express.Router();

router.get('/errors', controller.errors);

router.get('/:id' , controller.fixError);

module.exports = router