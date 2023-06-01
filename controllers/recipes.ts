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
  id: 1;
  name: string;
  method: string;
  servings: number;
  ingredients: RecipeIngredient[];
}

recipesRouter.get("/mock", (req, res) => {
  console.log("/recipes/mock GET request recieved");

  res.send(recipeMocks);
});

recipesRouter.get("/", (req, res) => {
  console.log("/recipes/ GET request recieved");
  db.select()
    .from("recipe")
    .then((recipes) => {
      const whereInClause = recipes
        .map((recipe) => {
          return "'" + recipe.id + "'";
        })
        .join(",");

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
          const ingredients = result[0]; // knex.raw queries result in an array being returned. The payload is contained within the first element

          return recipes.map((recipe) => {
            const recipeIngredients = ingredients
              .filter((ingredient) => ingredient.recipe_id === recipe.id)
              .map((ingredient) => {
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
