var db = require('../db')
var dbReport = require('../dbReport')
const shortid = require('shortid')
const md5 = require('md5')

module.exports.report = function (req, res) {
    res.render('reports/reports',{
        reportData : dbReport.get('report').value()
    });
}