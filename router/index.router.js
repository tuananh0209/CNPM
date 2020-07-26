const express = require('express')
const controller = require('../controllers/index.controller')

const router = express.Router()

router.get('/index' , controller.index);

module.exports = router