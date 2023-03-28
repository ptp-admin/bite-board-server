require('dotenv').config()

const express = require('express')
const db = require('./utils/database')
const app = express()
const ingredientsRouter = require('./controllers/ingredients')

const port = process.env.PORT

app.use(express.json())
app.use(express.static('build'))

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`)
})

// TODO: separate '/ingredients' routes into another file
app.use('/ingredients', ingredientsRouter);


// // TODO: separate '/recipes' routes into another file
// app.get('/recipes', (req, res) => {
//   console.log('GET request recieved');
// 	// TODO: implement this whole route as a transaction for better performance. Knex has docs for transactions
//   db
//     .select()
//     .from('recipe')
//     .then(recipes => {
// 			// TODO separate this next part out into a function, call it like this: getRecipeIngredients(recipes)
// 			var recipesWithIngredients = recipes.map(recipe => { 
// 				return db
// 					.select(
// 						'ingredient.*',
// 					)
// 					.select(db.ref('recipe_ingredient.number_of').as('recipe_number_of'))
// 					.select(db.ref('recipe_ingredient.measurement_unit').as('recipe_measurement_unit'))
// 					.from('recipe_ingredient')
// 					.where('recipe_id', recipe.id)
// 					.join('ingredient', 'ingredient.id', '=', 'recipe_ingredient.ingredient_id')
// 					.then(ingredientsArray => {
// 						return {
// 							...recipe,
// 							// TODO: separate this out into a function, call it like this: getRecipeIngredientDetails(ingredients)
// 							ingredients: ingredientsArray.map(ingredient =>{ 
// 								// destructure the properties returned by the above SQL query
// 								const { id, name, category, cost_per, number_of, recipe_number_of, recipe_measurement_unit } = ingredient
								
// 								// reassemble the desired ingredient object
// 								return {
// 									id,
// 									name,
// 									category,
// 									number_of: recipe_number_of,
// 									measurement_unit: recipe_measurement_unit,
// 									derived_cost: (cost_per / number_of) * recipe_number_of, // TODO: write a function which handles this, calculateDerivedCost(ingredient). Account for cases where ingredient.measurement_unit and recipe_ingredient.measurement_unit need to be converted to calculate cost.
// 									ingredient_cost_per: cost_per
// 								}
// 							})}
// 					})
// 			})
// 			Promise.all(recipesWithIngredients).then(results => {
// 				res.send(results)
// 			})
// 		})
// })


