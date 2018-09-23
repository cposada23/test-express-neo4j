const neo4j = require('neo4j-driver').v1
const config = require('./config')
const uri = `bolt://${config.get('db.host')}:7687`
const driver = neo4j.driver(uri, neo4j.auth.basic(config.get('db.user'), config.get('db.password')))


module.exports = function(req, res, next) {
  req.driver = driver
  next()
}