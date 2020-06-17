const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('dbReport.json')
const dbReport = low(adapter)

dbReport.defaults({
        users: []
    })
    .write()

module.exports = dbReport