const recipesRouter = require('express').Router();
const db = require('../utils/database');
const recipeMocks = require('../mock-data/recipes');
const convert = require('convert-units');

const deriveCost = (
  ingredient_number_of,
  ingredient_cost_per,
  ingredient_measurement_unit,
  recipe_number_of,
  recipe_measurement_unit
) => {
  try {
    const scaleMulitplier = convert(1)
      .from(recipe_measurement_unit)
      .to(ingredient_measurement_unit);
    // recipe_number_of * ingredient_number_of * ingredient_cost_per * scale_mulitplier
    //        500(g)               1(kg)                 $10                 0.001
    // or convert(1).from('recipe_measurement_unit').to('ingredient_measurement_unit')
    const result =
      recipe_number_of *
      ingredient_number_of *
      ingredient_cost_per *
      scaleMulitplier;
    return result;
  } catch (Error) {
    return null;
  }
};

const addRecipeIngredient = async (trx, recipeId, ingredient) => {
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

  if (ingredient_id) {
    const existingEntry = await db('recipe_ingredient')
      .where({
        ingredient_id,
        recipe_id: recipeId,
      })
      .first();

    if (!existingEntry) {
      await db('recipe_ingredient')
        .insert({
          ingredient_id,
          recipe_id: recipeId,
          number_of: recipe_number_of,
          measurement_unit: recipe_measurement_unit,
        })
        .transacting(trx);
    }
  } else {
    const existingIngredient = await db('ingredient')
      .where('name', ingredient_name)
      .first();

    if (existingIngredient) {
      const existingEntry = await db('recipe_ingredient')
        .where({
          ingredient_id: existingIngredient.id,
          recipe_id: recipeId,
        })
        .first();

      if (!existingEntry) {
        await db('recipe_ingredient')
          .insert({
            ingredient_id: existingIngredient.id,
            recipe_id: recipeId,
            number_of: recipe_number_of,
            measurement_unit: recipe_measurement_unit,
          })
          .transacting(trx);
      }
    } else {
      const [ingredientId] = await db
        .insert({
          name: ingredient_name,
          category: ingredient_category || null,
          cost_per: ingredient_cost_per || null,
          number_of: ingredient_number_of || null,
          measurement_unit: ingredient_measurement_unit || null,
        })
        .returning('id')
        .into('ingredient')
        .transacting(trx);

      await db('recipe_ingredient')
        .insert({
          ingredient_id: ingredientId,
          recipe_id: recipeId,
          number_of: recipe_number_of,
          measurement_unit: recipe_measurement_unit,
        })
        .transacting(trx);
    }
  }
};

async function updateRecipe(recipeId, updatedFields, trx) {
  await db('recipe')
    .update(updatedFields)
    .where('id', recipeId)
    .transacting(trx);
}

async function addRecipeIngredients(recipeId, ingredients, trx) {
  for (const ingredient of ingredients) {
    await addRecipeIngredient(trx, recipeId, ingredient);
  }
}

async function updateRecipeIngredients(recipeId, ingredients, trx) {
  for (const ingredient of ingredients) {
    const { ingredient_id, recipe_number_of, recipe_measurement_unit } =
      ingredient;
    const updatedFields = {
      number_of: recipe_number_of,
      measurement_unit: recipe_measurement_unit,
    };

    await db('recipe_ingredient')
      .update(updatedFields)
      .where({
        ingredient_id,
        recipe_id: recipeId,
      })
      .transacting(trx);
  }
}

async function removeRecipeIngredients(recipeId, ingredients, trx) {
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

recipesRouter.get('/mock', (req, res) => {
  console.log('/recipes/mock GET request received');
  res.send(recipeMocks);
});

recipesRouter.get('/', async (req, res) => {
  try {
    console.log('/recipes/ GET request received');
    const recipes = await db.select().from('recipe');
    const recipeIds = recipes.map((recipe) => recipe.id);
    const ingredients = await db('recipe_ingredient as ri')
      .select(
        'i.id as ingredient_id',
        'i.name as ingredient_name',
        'i.category as ingredient_category',
        'i.cost_per as ingredient_cost_per',
        'i.number_of as ingredient_number_of',
        'i.measurement_unit as ingredient_measurement_unit',
        'ri.recipe_id',
        'ri.number_of as recipe_number_of',
        'ri.measurement_unit as recipe_measurement_unit'
      )
      .leftJoin('ingredient as i', 'i.id', 'ri.ingredient_id')
      .whereIn('ri.recipe_id', recipeIds);

    const result = recipes.map((recipe) => {
      const recipeIngredients = ingredients
        .filter((ingredient) => ingredient.recipe_id === recipe.id)
        .map((ingredient) => {
          const {
            ingredient_number_of,
            ingredient_cost_per,
            ingredient_measurement_unit,
            recipe_number_of,
            recipe_measurement_unit,
            recipe_id,
            ...rest
          } = ingredient;
          return {
            ...rest,
            recipe_number_of,
            derived_cost: deriveCost(
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

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
  try {
    console.log(`/recipes/${id} GET request received`);
    const returnedRecipe = await db.select().from('recipe').where('id', id);
		const recipe = returnedRecipe[0]
    const recipeId = recipe.id
		
    const ingredients = await db('recipe_ingredient as ri')
      .select(
        'i.id as ingredient_id',
        'i.name as ingredient_name',
        'i.category as ingredient_category',
        'i.cost_per as ingredient_cost_per',
        'i.number_of as ingredient_number_of',
        'i.measurement_unit as ingredient_measurement_unit',
        'ri.recipe_id',
        'ri.number_of as recipe_number_of',
        'ri.measurement_unit as recipe_measurement_unit'
      )
      .leftJoin('ingredient as i', 'i.id', 'ri.ingredient_id')
      .where('ri.recipe_id', recipeId);

		const recipeIngredients = ingredients
			.filter((ingredient) => ingredient.recipe_id === recipeId)
			.map((ingredient) => {
				const {
					ingredient_number_of,
					ingredient_cost_per,
					ingredient_measurement_unit,
					recipe_number_of,
					recipe_measurement_unit,
					recipe_id,
					...rest
				} = ingredient;
				return {
					...rest,
					recipe_number_of,
					recipe_measurement_unit,
					derived_cost: deriveCost(
						ingredient_number_of,
						ingredient_cost_per,
						ingredient_measurement_unit,
						recipe_number_of,
						recipe_measurement_unit
					),
				};
			});

		const result =  {
			...recipe,
			recipeIngredients,
		};

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.post('/', async (req, res) => {
  console.log('/recipes/ POST request received');
  const { recipeIngredients, name, ...recipe } = req.body;

  try {
    await db.transaction(async (trx) => {
      const [recipeId] = await db
        .insert({ name, ...recipe })
        .returning('id')
        .into('recipe')
        .transacting(trx);

      const ingredientPromises = recipeIngredients.map((ingredient) =>
        addRecipeIngredient(trx, recipeId, ingredient)
      );

      await Promise.all(ingredientPromises);
    });

    const successMessage = `Successfully added ${name} and all ingredients to the database`;
    console.log(successMessage);
    res.send(successMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

recipesRouter.put('/:id', async (req, res) => {
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

    await db.transaction(async (trx) => {
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

recipesRouter.delete('/:id', async (req, res) => {
  const recipeId = req.params.id;

  try {
    const existingRecipe = await db('recipe').where('id', recipeId).first();

    if (!existingRecipe) {
      const errorMessage = `A recipe with ID ${recipeId} does not exist`;
      console.log(errorMessage);
      return res.status(404).send(errorMessage);
    }

    await db.transaction(async (trx) => {
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
