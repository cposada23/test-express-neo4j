const express = require('express')
const bodyParser = require('body-parser')
const neo4j = require('neo4j-driver').v1
const config = require('./config/config')
const uri = `bolt://${config.get('db.host')}:7687`
const driver = neo4j.driver(uri, neo4j.auth.basic(config.get('db.user'), config.get('db.password')))

var app = express()
app.use(bodyParser.json()) 

app.get('/', (req, res) => {
  res.send("hola")
})
app.post('/todo', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const session = driver.session()
  const resultPromise = session.run(
    'CREATE (a:Person {name: $name}) RETURN a',
    {name: name}
  )

  resultPromise.then(result => {
    session.close()
    const singleRecord = result.records[0]
    const node = singleRecord.get(0);
    console.log("todo bien ", node.properties.name)
    driver.close()
    res.send({name: node.properties.name})
  }).catch(e => {
    console.error("Algo ocurrio mal " , e)
  })
  // MATCH (tom {name: "Tom Hanks"}) RETURN tom
})


app.listen(config.get('port'), () => {
  console.log(`App started on port: ${config.get('port')}`)
})