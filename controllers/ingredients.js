const ingredientsRouter = require('express').Router();
const db = require('../utils/database'); // Using 'knex' package for database calls

ingredientsRouter.get('/', (req, res) => {
  console.log('/ingredients/ GET request recieved');

  db
    .select()
    .from('ingredient')
    .then(response => res.send(response));
});

ingredientsRouter.get('/:id', (req, res) => {
  db
    .select()
    .from('ingredient')
    .where('id', req.params.id)
    .then(response => res.send(response));
});

ingredientsRouter.post('/', (req, res) => {
  console.log('/ingredients/ POST request recieved');

  db('ingredient')
    .insert({
      name: req.body.name,
      category: req.body.category,
      cost_per: req.body.cost_per,
      number_of: req.body.number_of,
      measurement_unit: req.body.measurement_unit
    })
    .then(() => res.send('Added ingredient to database'));
});

ingredientsRouter.put('/:id', (req, res) => {
  console.log('/ingredients/ PUT request recieved');

  db('ingredient')
    .where('id', req.params.id)
    .update({
      name: req.body.name,
      category: req.body.category,
      cost_per: req.body.cost_per,
      number_of: req.body.number_of,
      measurement_unit: req.body.measurement_unit
    })
    .then(() => res.send('Updated ingredient in database'));
});

ingredientsRouter.delete('/:id', (req, res) => {
  console.log('/ingredients/ DELETE request recieved');

  const id = req.params.id;
  db('ingredient')
    .where('id', id)
    .del()
    .then(console.log(`deleted record with id: ${id}`))
    .then(() => {
      db
        .select().from('ingredient')
        .then(response => res.send(response));
    });
});

module.exports = ingredientsRouter;
