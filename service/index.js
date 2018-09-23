const express = require('express')

const neo4j = require('neo4j-driver').v1
const config = require('./config/config')
const uri = `bolt://${config.get('db.host')}:7687`
const driver = neo4j.driver(uri, neo4j.auth.basic(config.get('db.user'), config.get('db.password')))

var app = express()



/**Configuración de express */
require('./config/express')(app)


app.use(require('./routes/api')(driver))
// app.use(require('./routes/api'))


app.listen(app.get('port'), () => {
  console.log(`App started on port: ${app.get('port')}`)
})
