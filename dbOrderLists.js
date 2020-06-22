const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('dbOrderLists.json')
const dbOrderLists = low(adapter)

dbOrderLists.defaults({
    orderLists : []
    })
    .write()

module.exports = dbOrderLists