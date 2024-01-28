var mysql = require('mysql')
var dbConfig = require('./dbConfig')
var connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.host,
  password: dbConfig.password,
  database: dbConfig.database
})

module.exports = connection