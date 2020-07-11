const jsdom = require('jsdom');


function download_csv(data) {
    var csv = "Report Vendor " + "," + data[0].vendor +"\n\n\n";
    csv += ',Name,ID,Price,Amount,Date\n';
    var total = 0;
    data.forEach(function (row , index) {
        index++;
        csv += index +"," + row.name +"," + row.idFood + "," + row.price + "," + row.amount + "," + row.date;
        csv += "\n";
        total+= parseInt(row.price) * parseInt(row.amount);
    });
    csv += "Total revenue" + "," + total;

    console.log(csv);
    
    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'Report.csv';
    // hiddenElement.click();
    return csv
}

module.exports = download_csv