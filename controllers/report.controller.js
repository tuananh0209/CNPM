var db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')

module.exports.report = function (req, res) {
    res.render('reports/reports');
}