import type {
  DbRecipeIngredient,
  DbRecipeIngredientDetailed,
	DbIngredient,
  Ingredient,
  Recipe,
  RecipeIngredient,
} from '../types/data';

const recipesRouter = require('express').Router();
const db = require('../utils/database');
const recipeMocks = require('../mockData/recipes');
const convert = require('convert-units');

const deriveCost = ({
  recipe_measurement_unit,
  recipe_number_of,
  measurement_unit,
  number_of,
  cost_per,
}: DbRecipeIngredientDetailed) => {
  try {
    const scaleMulitplier = convert(1)
      .from(recipe_measurement_unit)
      .to(measurement_unit);

    let result;
    if (recipe_number_of && number_of && cost_per) {
      result = recipe_number_of * number_of * cost_per * scaleMulitplier;
    }

    return result;
  } catch (Error) {
    return undefined;
  }
};

const costPerServe = (
  servings: number,
  recipe_ingredients: Array<RecipeIngredient>
) => {
  const total = recipe_ingredients.reduce(
    (total, ingredient) => ingredient.derivedCost || 0 + total,
    0
  );

  return formatAsFloat2DecimalPlaces(total / servings);
};

const formatAsFloat2DecimalPlaces = (num: Number) => {
  if (!num) return 0;
  return Number(Math.round(parseFloat(num + 'e2')) + 'e-2');
};

async function updateRecipe(recipeId: number, recipe: Recipe, trx: any) {
  console.log(recipe);

  await db('recipe').update(recipe).where('id', recipeId).transacting(trx);
}

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

async function addRecipeIngredients(
  recipeId: number,
  ingredients: DbRecipeIngredientDetailed[],
  trx: any
) {
  for (const ingredient of ingredients) {
    await addRecipeIngredient(trx, recipeId, ingredient);
  }
}

async function updateRecipeIngredients(
  recipeId: number,
  ingredients: RecipeIngredient[],
  trx: any
) {
  for (const ingredient of ingredients) {
    const { id, recipeNumberOf, recipeMeasurementUnit } = ingredient;
    const updatedFields = {
      number_of: recipeNumberOf,
      measurement_unit: recipeMeasurementUnit,
    };

    await db('recipe_ingredient')
      .update(updatedFields)
      .where({
        ingredient_id: id,
        recipe_id: recipeId,
      })
      .transacting(trx);
  }
}

async function removeRecipeIngredients(
  recipeId: number,
  ingredients: Ingredient[],
  trx: any
) {
  const removeIngredientPromises = ingredients.map(async (ingredient) => {
    await db('recipe_ingredient')
      .where({
        ingredient_id: ingredient.id,
        recipe_id: recipeId,
      })
      .del()
      .transacting(trx);
  });

  await Promise.all(removeIngredientPromises);
}

recipesRouter.get('/mock', (req: any, res: any) => {
  console.log('/recipes/mock GET request received');
  res.send(recipeMocks);
});

recipesRouter.get('/', async (req: any, res: any) => {
  try {
    console.log('/recipes/ GET request received');
    const recipes = await db.select().from('recipe');
    const recipeIds = recipes.map((recipe: Recipe) => recipe.id);
    const queriedIngredients: DbRecipeIngredientDetailed[] = await db(
      'recipe_ingredient as ri'
    )
      .select(
        'i.id',
        'i.name',
        'i.category',
        'i.cost_per',
        'i.number_of',
        'i.measurement_unit',
        'ri.recipe_id',
        'ri.number_of as recipe_number_of',
        'ri.measurement_unit as recipe_measurement_unit'
      )
      .leftJoin('ingredient as i', 'i.id', 'ri.ingredient_id')
      .whereIn('ri.recipe_id', recipeIds);

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

      const recipeCostPerServe = recipe.servings
        ? costPerServe(recipe.servings, recipeIngredients)
        : 0;

      return {
        ...recipe,
        recipeIngredients,
        costPerServe: recipeCostPerServe,
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

    const queriedIngredients: DbRecipeIngredientDetailed[] = await db(
      'recipe_ingredient as ri'
    )
      .select(
        'i.id',
        'i.name',
        'i.category',
        'i.cost_per',
        'i.number_of',
        'i.measurement_unit',
        'ri.recipe_id',
        'ri.number_of as recipe_number_of',
        'ri.measurement_unit as recipe_measurement_unit'
      )
      .leftJoin('ingredient as i', 'i.id', 'ri.ingredient_id')
      .where('ri.recipe_id', recipeId);

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

    const recipeCostPerServe = recipe.servings
      ? costPerServe(recipe.servings, recipeIngredients)
      : 0;

    const result: Recipe = {
      ...recipe,
      recipeIngredients,
      costPerServe: recipeCostPerServe,
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
							number_of: 0
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
					})
				
				// I'm honestly not sure how/why this works, but resolving these promises somehow adds the ingredients with ids back into recipeIngredients
				await Promise.all(newIngredients)
				
        const ingredientPromises = recipeIngredients.map(
          (ingredient: RecipeIngredient) => {
            addRecipeIngredient(trx, recipeId, ingredient);
          }
        );

        await Promise.all(ingredientPromises);
      }
			const successMessage = `Successfully added ${name} and all ingredients to the database`;
			console.log(successMessage);
			res.send({message: successMessage, recipeId});
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.put('/:id', async (req: any, res: any) => {
  const { id } = req.params;
  const { recipe, addIngredients, updateIngredients, removeIngredients } =
    req.body;

  try {
    const existingRecipe = await db
      .select()
      .from('recipe')
      .where('id', id)
      .first();

    if (!existingRecipe) {
      return res.status(404).send('Recipe not found');
    }

    await db.transaction(async (trx: any) => {
      if (recipe) {
        await updateRecipe(id, recipe, trx);
      }

      if (addIngredients) {
        await addRecipeIngredients(id, addIngredients, trx);
      }

      if (updateIngredients) {
        await updateRecipeIngredients(id, updateIngredients, trx);
      }

      if (removeIngredients) {
        await removeRecipeIngredients(id, removeIngredients, trx);
      }
    });

    res.send(`Recipe with ID ${id} has been updated successfully.`);
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
