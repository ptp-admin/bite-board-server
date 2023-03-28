const ingredientsRouter = require('express').Router()
const db = require('../utils/database')

ingredientsRouter.get('/ingredients', (req, res) => {
    console.log('GET request recieved');
    db
      .select()
      .from('ingredient')
      .then(response => res.send(response))
  })

console.log('controller called')
module.exports = ingredientsRouter