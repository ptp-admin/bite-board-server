import type {
  DbRecipeIngredient,
  DbRecipeIngredientDetailed,
  DbIngredient,
  Ingredient,
  Recipe,
  RecipeIngredient,
} from '../types/data';
import { getRecipeIngredients } from '../utils/recipes';

const recipesRouter = require('express').Router();
const db = require('../utils/database');
const recipeMocks = require('../mockData/recipes');
const convert = require('convert-units');
const _ = require('lodash');

interface CostPerServeAccumulator {
  total: number;
  costedIngredientsCount: number;
}

interface RecipeCostPerServe {
  costPerServe?: number;
  costAccuracy?: number;
}

const deriveCost = ({
  recipe_measurement_unit,
  recipe_number_of,
  measurement_unit,
  number_of,
  cost_per,
}: DbRecipeIngredientDetailed) => {
  try {
    if (recipe_number_of && number_of && cost_per) {
      if (recipe_measurement_unit === measurement_unit)
        return (recipe_number_of / number_of) * cost_per;

      const scaleMulitplier = convert(1)
        .from(recipe_measurement_unit)
        .to(measurement_unit);
      return ((recipe_number_of * scaleMulitplier) / number_of) * cost_per;
    }

    return undefined;
  } catch (Error) {
    return undefined;
  }
};

const costPerServe = (
  servings: number,
  recipe_ingredients: Array<RecipeIngredient>
): RecipeCostPerServe => {
  const { total, costedIngredientsCount } = recipe_ingredients.reduce(
    (
      { total, costedIngredientsCount }: CostPerServeAccumulator,
      ingredient
    ) => {
      return {
        total: total + (ingredient.derivedCost || 0),
        costedIngredientsCount: ingredient.derivedCost
          ? (costedIngredientsCount += 1)
          : costedIngredientsCount,
      };
    },
    { total: 0, costedIngredientsCount: 0 }
  );

  return {
    costPerServe: formatAsFloat2DecimalPlaces(total / servings),
    costAccuracy: formatAsFloat2DecimalPlaces(
      costedIngredientsCount / recipe_ingredients.length
    ),
  };
};

const formatAsFloat2DecimalPlaces = (num: Number) => {
  if (!num) return 0;
  return Number(Math.round(parseFloat(num + 'e2')) + 'e-2');
};

const addRecipeIngredient = async (
  trx: any,
  recipeId: number,
  ingredient: RecipeIngredient
) => {
  const { id, recipeMeasurementUnit, recipeNumberOf } = ingredient;

  // There must be an ingredient id provided
  if (id) {
    const recipeIngredient: DbRecipeIngredient = {
      ingredient_id: id,
      recipe_id: recipeId,
      number_of: recipeNumberOf,
      measurement_unit: recipeMeasurementUnit,
    };

    await db('recipe_ingredient').insert(recipeIngredient).transacting(trx);
  }
};

recipesRouter.get('/mock', (req: any, res: any) => {
  console.log('/recipes/mock GET request received');
  res.send(recipeMocks);
});

recipesRouter.get('/', async (req: any, res: any) => {
  try {
    console.log('/recipes/ GET request received');
    const recipes = await db.select().from('recipe');
    const recipeIds = recipes.map((recipe: Recipe) => recipe.id);
    const queriedIngredients = await getRecipeIngredients(recipeIds);

    const result: Recipe[] = recipes.map((recipe: Recipe) => {
      const recipeIngredients: RecipeIngredient[] = queriedIngredients
        .filter((ingredient) => ingredient.recipe_id === recipe.id)
        .map((ingredient: DbRecipeIngredientDetailed) => {
          const {
            number_of,
            cost_per,
            measurement_unit,
            recipe_number_of,
            recipe_measurement_unit,
            recipe_id,
            ...rest
          } = ingredient;

          const derivedCost = deriveCost(ingredient);

          const recipeIngredient: RecipeIngredient = {
            ...rest,
            costPer: cost_per,
            numberOf: number_of,
            measurementUnit: measurement_unit,
            recipeNumberOf: recipe_number_of,
            recipeMeasurementUnit: recipe_measurement_unit,
            derivedCost,
          };

          return recipeIngredient;
        });

      const recipeCostPerServe: RecipeCostPerServe = costPerServe(
        recipe.servings || 1,
        recipeIngredients
      );

      return {
        ...recipe,
        recipeIngredients,
        ...recipeCostPerServe,
      };
    });

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.get('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  try {
    console.log(`/recipes/${id} GET request received`);
    const returnedRecipe = await db.select().from('recipe').where('id', id);
    const recipe: Recipe = returnedRecipe[0];
    const recipeId = recipe.id;
    const queriedIngredients = await getRecipeIngredients([recipeId]);

    const recipeIngredients: RecipeIngredient[] = queriedIngredients
      .filter((ingredient) => ingredient.recipe_id === recipe.id)
      .map((ingredient: DbRecipeIngredientDetailed) => {
        const {
          number_of,
          cost_per,
          measurement_unit,
          recipe_number_of,
          recipe_measurement_unit,
          recipe_id,
          ...rest
        } = ingredient;

        const derivedCost = deriveCost(ingredient);

        const recipeIngredient: RecipeIngredient = {
          ...rest,
          costPer: cost_per,
          numberOf: number_of,
          measurementUnit: measurement_unit,
          recipeNumberOf: recipe_number_of,
          recipeMeasurementUnit: recipe_measurement_unit,
          derivedCost,
        };

        return recipeIngredient;
      });

    const recipeCostPerServe: RecipeCostPerServe = costPerServe(
      recipe.servings || 1,
      recipeIngredients
    );

    const result: Recipe = {
      ...recipe,
      recipeIngredients,
      ...recipeCostPerServe,
    };

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.post('/', async (req: any, res: any) => {
  console.log('/recipes/ POST request received');
  const { recipeIngredients, name, ...recipe } = req.body;

  try {
    await db.transaction(async (trx: any) => {
      const [recipeId] = await db
        .insert({ name, ...recipe })
        .returning('id')
        .into('recipe')
        .transacting(trx);

      if (recipeIngredients) {
        const newIngredients = recipeIngredients
          .filter((ingredient: RecipeIngredient) => !ingredient.id)
          .map(async (ingredient: RecipeIngredient) => {
            const newIngredient: DbIngredient = {
              name: ingredient.name,
              category: '',
              cost_per: 0,
              number_of: 0,
            };

            try {
              ingredient.id = await db
                .insert(newIngredient)
                .returning('id')
                .into('ingredient')
                .transacting(trx)
                .then(([id]: [number]) => id);
            } catch (error) {
              console.error(error);
              res.status(500).send(error);
            }

            return ingredient;
          });

        // I'm honestly not sure how/why this works, but resolving these promises somehow adds the ingredients with ids back into recipeIngredients
        await Promise.all(newIngredients);

        const ingredientPromises = recipeIngredients.map(
          (ingredient: RecipeIngredient) => {
            addRecipeIngredient(trx, recipeId, ingredient);
          }
        );

        await Promise.all(ingredientPromises);
      }
      const successMessage = `Successfully added ${name} and all ingredients to the database`;
      console.log(successMessage);
      res.send({ message: successMessage, recipeId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.put('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  console.log(`/recipes/${id} put request received`);
  try {
    // Find DB record of the recipe with specified ID
    const dbExistingRecipe = await db
      .select()
      .from('recipe')
      .where('id', id)
      .first();

    if (!dbExistingRecipe) {
      return res.status(404).send('Recipe not found');
    }

    const { name } = dbExistingRecipe;

    // Get list of recipe ingredients from DB
    const dbExistingIngredients = await db
      .select()
      .from('recipe_ingredient')
      .where('recipe_id', id);

    // Destructure recipe ingredients from request
    const { recipeIngredients, ...recipe } = req.body;
    // If any request ingredients do not have an id, they are new ingredients and need to be added to the DB
    const [existingIngredients, newIngredients] = _.partition(
      recipeIngredients,
      (i: Ingredient) => i.id
    );

    // Group existing by ingredient id for faster lookup
    const existingIngredientsById = _.groupBy(existingIngredients, 'id');
    const dbExistingIngredientsById = _.groupBy(
      dbExistingIngredients,
      'ingredient_id'
    );

    const newRecipeIngredients: RecipeIngredient[] = existingIngredients.filter(
      (ing: RecipeIngredient) => !dbExistingIngredientsById[`${ing.id}`]
    );

    await db.transaction(async (trx: any) => {
      // Update recipe name and servings
      await db('recipe').update(recipe).where('id', id).transacting(trx);

      // Add new (non-existing in ingredients table) ingredients
      for (const newIngredient of newIngredients) {
        const ingredient_id = await db
          .insert({ name: newIngredient.name })
          .returning('id')
          .into('ingredient')
          .transacting(trx)
          .then(([id]: [number]) => id);

        const dbNewIngredient: DbRecipeIngredient = {
          ingredient_id,
          recipe_id: id,
          number_of: newIngredient.recipeNumberOf || 0,
          measurement_unit: newIngredient.recipeMeasurementUnit,
        };

        await db
          .insert(dbNewIngredient)
          .into('recipe_ingredient')
          .transacting(trx);
      }

      for (const newRecipeIngredient of newRecipeIngredients) {
        if (newRecipeIngredient.id) {
          const dbNewIngredient: DbRecipeIngredient = {
            ingredient_id: newRecipeIngredient.id,
            recipe_id: id,
            number_of: newRecipeIngredient.recipeNumberOf || 0,
            measurement_unit: newRecipeIngredient.recipeMeasurementUnit,
          };

          await db
            .insert(dbNewIngredient)
            .into('recipe_ingredient')
            .transacting(trx);
        }
      }

      // Iterate over DB recipe ingredients
      for (const dbIngredient of dbExistingIngredients) {
        const { ingredient_id } = dbIngredient;
        // Check whether this recipe ingredient is found in the update request
        const found = existingIngredientsById[`${ingredient_id}`];

        if (!found) {
          // Delete recipe_ingredient from DB
          await db('recipe_ingredient')
            .where({
              ingredient_id: ingredient_id,
              recipe_id: id,
            })
            .del()
            .transacting(trx);
        } else {
          // Ingredient is present in the request, destructure it as requestIngredient
          const [requestIngredient] = found;
          // Check whether the request ingredient includes any updates
          if (
            dbIngredient.number_of !== requestIngredient.recipeNumberOf ||
            dbIngredient.measurement_unit !==
              requestIngredient.recipeMeasurementUnit
          ) {
            // Update recipe_ingredient in DB
            const updatedFields = {
              number_of: requestIngredient.recipeNumberOf,
              measurement_unit: requestIngredient.recipeMeasurementUnit,
            };

            await db('recipe_ingredient')
              .update(updatedFields)
              .where({
                ingredient_id: ingredient_id,
                recipe_id: id,
              })
              .transacting(trx);
          }
        }
      }

      const successMessage = `Successfully updated ${name} and all ingredients to the database`;
      console.log(successMessage);
      res.send({ message: successMessage, id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.delete('/:id', async (req: any, res: any) => {
  const recipeId: number = req.params.id;

  try {
    const existingRecipe = await db('recipe').where('id', recipeId).first();

    if (!existingRecipe) {
      const errorMessage = `A recipe with ID ${recipeId} does not exist`;
      console.log(errorMessage);
      return res.status(404).send(errorMessage);
    }

    await db.transaction(async (trx: any) => {
      // Delete recipe
      await db('recipe').where('id', recipeId).del().transacting(trx);

      // Delete associated recipe_ingredients
      await db('recipe_ingredient')
        .where('recipe_id', recipeId)
        .del()
        .transacting(trx);
    });

    const successMessage = `Successfully deleted recipe with ID ${recipeId}`;
    console.log(successMessage);
    res.send(successMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = recipesRouter;
export {};
