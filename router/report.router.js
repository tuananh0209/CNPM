const express = require('express');


const controller = require('../controllers/report.controller')
var router = express.Router();

router.get('/reports', controller.report)
router.get('/export', controller.exportFile);

module.exports = router