
const express = require('express')
const db = require('./utils/database')
const app = express()

const port = 3456

app.use(express.json())

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`)
})

app.get('/ingredients', (req, res) => {
  console.log('GET request recieved');
  db
    .select()
    .from('ingredient')
    .then(response => res.send(response))
})

app.get('/ingredients/:id', (req, res) => {
  db
    .select()
    .from('ingredient')
    .where('id', req.params.id)
    .then(response => res.send(response))
})

app.post('/ingredients', (req, res) => {
  console.log('POST request recieved');
  console.log(req.body);
  db('ingredient')
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
  db('ingredient')
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
  
  db('ingredient')
    .where('id', id)
    .del()
    .then(console.log(`deleted record with id: ${id}`))
    .then(() => {
      db
        .select().from('ingredient')
        .then(response => res.send(response))
    })
})

app.get('/recipe', (req, res) => {
  console.log('GET request recieved');
  db
    .select()
    .from('recipe')
    .then(recipes => {
			var recipesWithIngredients = recipes.map(recipe => {
				return db
					.select(
						'ingredient.*',
					)
					.select(db.ref('recipe_ingredient.number_of').as('recipe_number_of'))
					.select(db.ref('recipe_ingredient.measurement_unit').as('recipe_measurement_unit'))
					.from('recipe_ingredient')
					.where('recipe_id', recipe.id)
					.join('ingredient', 'ingredient.id', '=', 'recipe_ingredient.ingredient_id')
					.then(ingredientsArray => {
						return {...recipe, ingredients: ingredientsArray}
					})
			})
			Promise.all(recipesWithIngredients).then(results => {
				res.send(results)
			})
		})
})