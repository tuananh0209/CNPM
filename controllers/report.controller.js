const userManage = require('../models/userCreat.model');
const userMatchObject = require('../objects/userManage.object');
const reportData = require('../models/report.model')
const reportObject = require('../objects/report.object')

const moduleExport = require('../script/exportFileReport');

var reportDatas;
var user;

module.exports.report = async function (req, res) {
    var id = req.signedCookies.userId
    var d = new Date();
    var date = d.toLocaleDateString();
    var miliS = Date.parse(date);
    miliS -= 1000*60*60*24*30;

    
    await userManage.find({
        _id: id
    }, 
    function (err, data) {
       
        if (err) {
            if (err) {
                res.redirect('reports/reports');
                return;
            }
        }
        user = new userMatchObject(data[0].name, data[0]._id, data[0].pass, data[0].vendor);
        
    })
    
    setTimeout(function(){
        reportData.find({
            vendor: user.vendor
        }, function (err, data) {
            if (err) 
            {
                res.redirect('reports/reports');
                return;
            }

            if (data) {
                reportDatas = new reportObject(data);

            }
        })
    },100)

    setTimeout(function () {

        var temp = reportDatas.data.filter(function(value){

            var time = value.date;
            var index = time.indexOf(" ");
            time = time.slice(0, index);
            return Date.parse(time) >= miliS;
        })


        var idList = [];
        var data = [];
        
        temp.map(function(value){
            
            if ( idList.indexOf(value.idFood) == -1){
                data.push(value);
                idList.push(value.idFood);
            }else{
                var i;
                for (i = 0 ; i < data.length ; i++ ){
                    if (data[i].idFood == value.idFood){
                        data[i].amount = parseInt(data[i].amount) + parseInt(value.amount);
                    }
                }
            }

        })
   
        res.render('reports/reports', {
            reportData: data,
            lastDay: new Date(miliS).toLocaleDateString(),
            toDay : date,
            data: JSON.stringify(data)

        });
    }, 500);
   
}

module.exports.exportFile = async function(req , res){
    var id = req.signedCookies.userId
    var d = new Date();
    var date = d.toLocaleDateString();
    var miliS = Date.parse(date);
    miliS -= 1000 * 60 * 60 * 24 * 30;
 

    await userManage.find({
            _id: id
        },
        function (err, data) {

            if (err) {
                if (err) {
                    res.redirect('reports/reports');
                    return;
                }
            }
            user = new userMatchObject(data[0].name, data[0]._id, data[0].pass, data[0].vendor);

        })


    await reportData.find({
        vendor: user.vendor
    }, function (err, data) {
        if (err) {
            res.redirect('reports/reports');
            return;
        }

        if (data) {
            reportDatas = new reportObject(data);

        }
    })
    setTimeout(function () {
        var lastDay = new Date(miliS).toLocaleDateString();
        var toDay = date;
        var temp = reportDatas.data.filter(function (value) {

            var time = value.date;
            var index = time.indexOf(" ");
            time = time.slice(0, index);
            return Date.parse(time) >= miliS;
        })


        var idList = [];
        var data = [];

        temp.map(function (value) {

            if (idList.indexOf(value.idFood) == -1) {
                data.push(value);
                idList.push(value.idFood);
            } else {
                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].idFood == value.idFood) {
                        data[i].amount = parseInt(data[i].amount) + parseInt(value.amount);
                    }
                }
            }

        })

        var csv = moduleExport(data , lastDay , toDay);
        res.send(csv);

    }, 500);

    
}