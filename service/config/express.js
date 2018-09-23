const config = require('./config')
const bodyParser = require('body-parser')
const cors = require('cors')
const expressValidator = require('express-validator')


module.exports = function(app) {
  app.set('port', config.get('port'))
  app.use(cors( {
    origin           : '*',
    withCredentials  : false,
    allowedHeaders   : ['Content-Type', 'Authorization','x-forwarded-for', 'x-forwarded-proto','X-Requested-With', 'Accept', 'Origin' ]
  }));
  
  app.use(bodyParser.json())
  app.use(expressValidator())
  app.use(bodyParser.urlencoded({extended: true}))

}