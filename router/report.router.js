const express = require('express');
const validate = require('../validate/user.validate')
const validateAuth = require('../validate/auth.validate')
const multer = require('multer')


const controller = require('../controllers/report.controller')
var router = express.Router();

router.get('/reports', controller.report)

module.exports = router