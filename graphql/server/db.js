var mysql = require('mysql')
var dbConfig = require('./dbConfig') // 里面的内容需要根据各自本地环境具体配置
var connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
})

module.exports = connection