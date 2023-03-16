
const express = require('express')
const db = require('./utils/database')
const app = express()

const port = 3456

app.use(express.json())

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`)
})

app.get('/ingredients', (req, res) => {
  console.log('GET request recived');
  db
    .select()
    .from('ingredients')
    .then(response => res.send(response))
})

app.get('/ingredients/:id', (req, res) => {
  db
    .select()
    .from('ingredients')
    .where('id', req.params.id)
    .then(response => res.send(response))
})

app.post('/ingredients', (req, res) => {
  console.log('POST request recieved');
  console.log(req.body);
  db('ingredients')
    .insert({
      name: req.body.name, 
      category: req.body.category,
      cost_per: req.body.cost_per,
      number_of: req.body.number_of,
      measurement_unit: req.body.measurement_unit
    })
    .then(() => res.send('Added ingredient to database'))
})

app.put('/ingredients/:id', (req, res) => {
  db('ingredients')
  .where('id', req.params.id)
  .update({
    name: req.body.name, 
    category: req.body.category,
    cost_per: req.body.cost_per,
    number_of: req.body.number_of,
    measurement_unit: req.body.measurement_unit
  })
  .then(() => res.send('Updated ingredient in database'))
})

app.delete('/ingredients/:id', (req, res) => {
  const id = req.params.id
  
  db('ingredients')
    .where('id', id)
    .del()
    .then(console.log(`deleted record with id: ${id}`))
    .then(() => {
      db
        .select().from('ingredients')
        .then(response => res.send(response))
    })
})
