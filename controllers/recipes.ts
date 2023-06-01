/* eslint-disable camelcase */
/* eslint-disable no-tabs */
const recipesRouter = require('express').Router();
const db = require('../utils/database');
const recipeMocks = require('../mock-data/recipes');
const convert = require('convert-units');

interface Ingredient {
  id: number;
  name: string;
  category: string;
  cost_per: number;
  number_of: number;
  measurement_unit: string;
}

interface RecipeIngredient extends Ingredient {
  derived_cost: number;
  ingredient_cost_per: number;
}

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
                  ingredient_number_of,
                  ingredient_cost_per,
                  ingredient_measurement_unit,
                  recipe_number_of,
                  recipe_measurement_unit,
                  recipe_id,
                  ...rest
                } = ingredient;
                // reassemble the desired ingredient object
                return {
                  ...rest,
                  recipe_number_of,
                  ingredient_derived_cost: deriveCost(
                    ingredient_number_of,
                    ingredient_cost_per,
                    ingredient_measurement_unit,
                    recipe_number_of,
                    recipe_measurement_unit
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

// recipe_number_of * ingredient_number_of * ingredient_cost_per * scale_mulitplier
//        500(g)               1(kg)                 $10                 0.001
// or convert(1).from('recipe_measurement_unit').to('ingredient_measurement_unit')
const deriveCost = (
  ingredient_number_of,
  ingredient_cost_per,
  ingredient_measurement_unit,
  recipe_number_of,
  recipe_measurement_unit
) => {
  try {
    const scale_mulitplier = convert(1)
      .from(recipe_measurement_unit)
      .to(ingredient_measurement_unit);
    const result =
      recipe_number_of *
      ingredient_number_of *
      ingredient_cost_per *
      scale_mulitplier;
    return result;
  } catch (Error) {
    return Error.message;
  }
};

module.exports = recipesRouter;
