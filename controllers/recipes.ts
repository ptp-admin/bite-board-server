const recipesRouter = require('express').Router();
const db = require('../utils/database');
const recipeMocks = require('../mock-data/recipes');
const convert = require('convert-units');

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
    res.send(error);
  }
});

recipesRouter.post('/', async (req, res) => {
  const { recipeIngredients, name, ...recipe } = req.body;

  try {
    await db.transaction(async (trx) => {
      const [recipeId] = await db
        .insert({ name, ...recipe })
        .returning('id')
        .into('recipe')
        .transacting(trx);

      const ingredientPromises = recipeIngredients.map(async (ingredient) => {
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
          await db('recipe_ingredient')
            .insert({
              ingredient_id,
              recipe_id: recipeId,
              number_of: recipe_number_of,
              measurement_unit: recipe_measurement_unit,
            })
            .transacting(trx);
        } else {
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

          await db('recipe_ingredient')
            .insert({
              ingredient_id: ingredientId,
              recipe_id: recipeId,
              number_of: recipe_number_of,
              measurement_unit: recipe_measurement_unit,
            })
            .transacting(trx);
        }
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
