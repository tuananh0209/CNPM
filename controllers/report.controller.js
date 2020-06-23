// var db = require('../db')
// var dbReport = require('../dbReport')
const userManage = require('../models/userCreat.model');
const userMatchObject = require('../objects/userManage.object');
const reportData = require('../models/report.model')
const reportObject = require('../objects/report.object')
const shortid = require('shortid')
const md5 = require('md5')

module.exports.report = async function (req, res) {
    // res.render('reports/reports',{
    //     reportData : dbReport.get('report').value()
    // });
    var reportDatas;
    var user;

    await userManage.find({
        _id: req.signedCookies.userId
    }, function (err, data) {
        console.log(data[0]._id);
        if (err) {
            if (err) return next(err);
        }
        user = new userMatchObject(data[0].name, data[0]._id, data[0].pass, data[0].vendor);
    });

    await reportData.find({
        vendor: user.vendor 
    }, function(err , data){
        if (err) console.log(err);
        console.log(data);
        if (data){
            reportDatas = new reportObject(data);
            console.log(reportDatas);
        }
        res.render('reports/reports', {
            reportData : reportDatas.data
        });

    })
 
}