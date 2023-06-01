/* eslint-disable camelcase */
/* eslint-disable no-tabs */
const recipesRouter = require('express').Router();
const db = require('../utils/database');
const recipeMocks = require('../mock-data/recipes');

interface Recipe {
  id: number;
  name: string;
  method: string;
  servings: number;
  recipeIngredients: RecipeIngredient[];
}

interface RecipeIngredient {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_category: string;
  ingredient_measurement_unit: string;
  recipe_measurement_unit: string;
  recipe_number_of: number;
  ingredient_derived_cost: number;
}

interface ReturnedIngredient extends RecipeIngredient {
  ingredient_cost_per: number;
  ingredient_number_of: number;
  recipe_id: number;
}

recipesRouter.get('/mock', (req, res) => {
  console.log('/recipes/mock GET request recieved');

  res.send(recipeMocks);
});

recipesRouter.get('/', (req, res) => {
  console.log('/recipes/ GET request recieved');
  db.select()
    .from('recipe')
    .then((recipes: Recipe[]) => {
      const whereInClause = recipes
        .map((recipe) => {
          return "'" + recipe.id + "'";
        })
        .join(',');

      db.raw(
        `
					SELECT
						i.id as ingredient_id,
						i.name as ingredient_name,
						i.category as ingredient_category,
						i.cost_per as ingredient_cost_per,
						i.number_of as ingredient_number_of,
						i.measurement_unit as ingredient_measurement_unit,
						ri.recipe_id,
						ri.number_of as recipe_number_of,
						ri.measurement_unit as recipe_measurement_unit
					FROM
						recipe_ingredient ri
					LEFT JOIN
						ingredient i ON i.id = ri.ingredient_id
					WHERE
						ri.recipe_id IN (${whereInClause})
				`
      )
        .then((result) => {
          const ingredients: ReturnedIngredient[] = result[0]; // knex.raw queries result in an array being returned. The payload is contained within the first element

          return recipes.map((recipe): Recipe => {
            const recipeIngredients = ingredients
              .filter((ingredient) => ingredient.recipe_id === recipe.id)
              .map((ingredient): RecipeIngredient => {
                // destructure the properties returned by the above SQL query
                const {
                  ingredient_cost_per,
                  ingredient_number_of,
                  recipe_number_of,
                  recipe_id,
                  ...rest
                } = ingredient;
                // reassemble the desired ingredient object
                return {
                  ...rest,
                  recipe_number_of,
                  ingredient_derived_cost: deriveCost(
                    ingredient_cost_per,
                    ingredient_number_of,
                    recipe_number_of
                  ),
                };
              });

            return {
              ...recipe,
              recipeIngredients,
            };
          });
        })
        .then((result) => {
          res.send(result);
        });
    });
});

// Special thanks to chatGPT for helping with this one
recipesRouter.post('/', async (req, res) => {
  const { recipeIngredients, name, ...recipe } = req.body;

  try {
    await db.transaction(async (trx) => {
      const recipeId = await db
        .insert({ name, ...recipe })
        .returning('id')
        .into('recipe')
        .transacting(trx);

      const ingredientPromises = recipeIngredients.map((ingredient) => {
        const {
          ingredient_id,
          ingredient_name,
          ingredient_category,
          ingredient_cost_per,
          ingredient_number_of,
          ingredient_measurement_unit,
          recipe_measurement_unit,
          recipe_number_of,
        } = ingredient;

        const insertPromise = ingredient_id
          ? db('recipe_ingredient').insert({
              ingredient_id,
              recipe_id: recipeId[0],
              number_of: recipe_number_of,
              measurement_unit: recipe_measurement_unit,
            })
          : db.transaction(async (trx) => {
              const [ingredientId] = await db
                .insert({
                  name: ingredient_name,
                  category: ingredient_category,
                  cost_per: ingredient_cost_per,
                  number_of: ingredient_number_of,
                  measurement_unit: ingredient_measurement_unit,
                })
                .returning('id')
                .into('ingredient')
                .transacting(trx);

              return db('recipe_ingredient').insert({
                ingredient_id: ingredientId,
                recipe_id: recipeId[0],
                number_of: recipe_number_of,
                measurement_unit: recipe_measurement_unit,
              });
            });

        return insertPromise.transacting(trx);
      });

      await Promise.all(ingredientPromises);
    });

    console.log(
      `Successfully added ${name} and all ingredients to the database`
    );
    res.send(`Successfully added ${name} and all ingredients to the database`);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

/* TODO function for calculating the derived ingredient cost for the recipe
Account for cases where ingredient.measurement_unit and recipe_ingredient.measurement_unit 
need to be converted to calculate cost. */
const deriveCost = (
  ingredient_cost_per,
  ingredient_number_of,
  recipe_number_of
) => {
  return (ingredient_cost_per / ingredient_number_of) * recipe_number_of;
};

// TODO function for taking the ingredient_unit and recipe_unit
// returns multipliers to be used as ingredient_unit_converted and recipe_unit_converted
// call it unitsToMultipliers(small_unit, big_unit) ??

module.exports = recipesRouter;
