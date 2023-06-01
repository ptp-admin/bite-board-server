/* eslint-disable camelcase */
/* eslint-disable no-tabs */
const recipesRouter = require("express").Router();
const db = require("../utils/database");
const recipeMocks = require("../mock-data/recipes");

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
