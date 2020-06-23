const express = require('express');
const validateAuth = require('../validate/auth.validate')
const multer = require('multer')


const controller = require('../controllers/report.controller')
var router = express.Router();

router.get('/reports', controller.report)
router.get('/export', controller.exportFile);

module.exports = router