
module.exports = function (driver) {
  const router = require('express').Router()

  router.get('/', (req, res) => {
    res.send('hola')
  })
  router.post('/todo', (req, res) => {
    console.log(req.body)
    const name = req.body.name
    const session = driver.session()
    const resultPromise = session.run(
      'CREATE (a:Person {name: $name}) RETURN a',
      { name: name }
    )

    resultPromise.then(result => {
      session.close()
      const singleRecord = result.records[0]
      const node = singleRecord.get(0)
      console.log('todo bien ', node.properties.name)
      driver.close()
      res.send({ name: node.properties.name })
    }).catch(e => {
      console.error('Algo ocurrio mal ', e)
    })
  })

  return router
}


// module.exports = function () {
//   const router = require('express').Router()

//   router.get('/', (req, res) => {
//     res.send('hola')
//   })
//   router.post('/todo', (req, res) => {
//     console.log(req.body)
//     const name = req.body.name
//     const session = req.driver.session()
//     const resultPromise = session.run(
//       'CREATE (a:Person {name: $name}) RETURN a',
//       { name: name }
//     )

//     resultPromise.then(result => {
//       session.close()
//       const singleRecord = result.records[0]
//       const node = singleRecord.get(0)
//       console.log('todo bien ', node.properties.name)
//       driver.close()
//       res.send({ name: node.properties.name })
//     }).catch(e => {
//       console.error('Algo ocurrio mal ', e)
//     })
//     // MATCH (tom {name: "Tom Hanks"}) RETURN tom
//   })

//   return router
// }