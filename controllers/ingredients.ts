import { randomUUID } from 'crypto';
import { Ingredient } from '../types/types';
import { getIngredientById, getIngredients } from '../utils/ingredients';
const ingredientsRouter = require('express').Router();
const db = require('../utils/database'); // Using 'knex' package for database calls
const cors = require('cors');
const convert = require('convert-units');

ingredientsRouter.get('/measurementUnits', cors(), (req: any, res: any) => {
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

ingredientsRouter.get('/', async (req: any, res: any) => {
  console.log('/ingredients/ GET request recieved');

  const data = await getIngredients().catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });

  res.send(data);
});

ingredientsRouter.get('/:id', async (req: any, res: any) => {
  const id = req.params.id as string;
  console.log(`/ingredients/${id} GET request recieved`);

  const data = await getIngredientById(id).catch((error) => {
    console.error(error);
    res.status(500).send(error);
  });

  res.send(data);
});

ingredientsRouter.post('/', (req: any, res: any) => {
  console.log('/ingredients/ POST request recieved');
  const ingredient: Ingredient = {
    id: randomUUID(),
    name: req.body.name,
    category: req.body.category,
    cost_per: req.body.costPer,
    number_of: req.body.numberOf,
    measurement_unit: req.body.measurementUnit || '',
  };

  try {
    db('ingredient')
      .insert(ingredient)
      .then(() => res.send('Added ingredient to database'));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

ingredientsRouter.put('/:id', (req: any, res: any) => {
  console.log('/ingredients/ PUT request recieved');
  const ingredient: Ingredient = {
    id: req.params.id,
    name: req.body.name,
    category: req.body.category,
    cost_per: req.body.costPer,
    number_of: req.body.numberOf,
    measurement_unit: req.body.measurementUnit || '',
  };

  try {
    db('ingredient')
      .where('id', req.params.id)
      .update(ingredient)
      .then(() => res.send('Updated ingredient in database'));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

ingredientsRouter.delete('/:id', (req: any, res: any) => {
  console.log('/ingredients/ DELETE request recieved');
  const id = req.params.id;

  db('ingredient')
    .where('id', id)
    .del()
    .then(console.log(`deleted record with id: ${id}`))
    .then(() => {
      db.select()
        .from('ingredient')
        .then((response: any) => res.send(response));
    })
    .catch((error: any) => {
      console.error(error);
      res.status(500).send(error);
    });
});

export { ingredientsRouter };
