const ingredientsRouter = require('express').Router();
const db = require('../utils/database'); // Using 'knex' package for database calls
const cors = require('cors');
const convert = require('convert-units');

ingredientsRouter.get('/', (req, res) => {
  console.log('/ingredients/ GET request recieved');

  db.select()
    .from('ingredient')
    .then((response) => res.send(response));
});

ingredientsRouter.get('/measurementUnits', cors(), (req, res) => {
  const exclude = [
    'mcg',
    'mt',
    't',
    'mm3',
    'cm3',
    'cl',
    'dl',
    'kl',
    'm3',
    'km3',
    'krm',
    'tsk',
    'msk',
    'kkp',
    'glas',
    'kanna',
    'in3',
    'ft3',
    'yd3',
  ];
  const massUnits = convert().from('kg').possibilities();
  const volumeUnits = convert().from('l').possibilities();
  const cookingUnits = ['']
    .concat(massUnits)
    .concat(volumeUnits)
    .filter((unit) => {
      return exclude.indexOf(unit) < 0;
    })
    .concat('pieces');

  res.send(cookingUnits);
});

ingredientsRouter.get('/:id', (req, res) => {
  db.select()
    .from('ingredient')
    .where('id', req.params.id)
    .then((response) => res.send(response));
});

ingredientsRouter.post('/', (req, res) => {
  console.log('/ingredients/ POST request recieved');

  db('ingredient')
    .insert({
      name: req.body.name,
      category: req.body.category,
      cost_per: req.body.costPer,
      number_of: req.body.numberOf,
      measurement_unit: req.body.measurementUnit || '',
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
      cost_per: req.body.costPer,
      number_of: req.body.numberOf,
      measurement_unit: req.body.measurementUnit,
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
      db.select()
        .from('ingredient')
        .then((response) => res.send(response));
    });
});

module.exports = ingredientsRouter;
