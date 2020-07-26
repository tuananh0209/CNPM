const jsdom = require('jsdom');


function download_csv(data , lastDay , toDay) {
    var csv = "Report Vendor " + "," + data[0].vendor +"\n\n\n";
    csv += ',Name,ID,Price,Amount\n';
    var total = 0;
    data.forEach(function (row , index) {
        index++;
        csv += index +"," + row.name +"," + row.idFood + "," + row.price + "," + row.amount;
        csv += "\n";
        total+= parseInt(row.price) * parseInt(row.amount);
    });
    csv +="Date" + "," + lastDay + "," + toDay + '\n';
    csv += "Total revenue" + "," + total;


    
    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'Report.csv';
    // hiddenElement.click();
    return csv
}

module.exports = download_csv