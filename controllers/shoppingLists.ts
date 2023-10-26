import type {
  DbShoppingList,
  DbShoppingListRecipe,
  Recipe,
  ShoppingList,
  ShoppingListRecipe,
  ShoppingListWithRecipes,
} from '../types/data';
import { getRecipeIngredients } from '../utils/recipes';
import { getShoppingListRecipes } from '../utils/shoppingLists';
import { deriveCost, formatAsFloat2DecimalPlaces } from './recipes';
import { sumBy } from 'lodash';

const shoppingListsRouter = require('express').Router();
const db = require('../utils/database');

const addShoppingListRecipe = async (
  trx: any,
  shoppingListId: number,
  recipeId: number,
  servings: number
) => {
  await db('shopping_list_recipe')
    .insert({
      shopping_list_id: shoppingListId,
      recipe_id: recipeId,
      servings: servings,
    })
    .transacting(trx);
};

shoppingListsRouter.post('/', async (req: any, res: any) => {
  console.log('/shopping-lists/ POST request received');

  const { name, shoppingListRecipeIdsAndServings } = req.body;
  console.log(name, shoppingListRecipeIdsAndServings);

  try {
    await db.transaction(async (trx: any) => {
      const [shoppingListId] = await db
        .insert({ name })
        .returning('id')
        .into('shopping_list')
        .transacting(trx);

      if (shoppingListRecipeIdsAndServings) {
        const recipePromises = shoppingListRecipeIdsAndServings.map(
          (recipe: ShoppingListRecipe) =>
            addShoppingListRecipe(
              trx,
              shoppingListId,
              recipe.recipeId,
              recipe.servings
            )
        );

        await Promise.all(recipePromises);
      }
    });

    const successMessage = `Successfully added ${name} and all recipes to the database`;
    console.log(successMessage);
    res.send(successMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

shoppingListsRouter.post('/:id/add-recipe/', async (req: any, res: any) => {
  const shoppingListId = req.params.id
  const { recipeId, servings } = req.body;

  const result = await db('shopping_list_recipe')
    .insert({
      shopping_list_id: shoppingListId,
      recipe_id: recipeId,
      servings: servings,
    }).catch((error: any) => {
      console.error(error);
      res.status(500).send(error);
    });
  const successMessage = `Successfully added recipe/${recipeId}/ to shopping-list/${shoppingListId}/`;
  console.log(successMessage);
  res.send(successMessage);
});

shoppingListsRouter.put('/:id', async (req: any, res: any) => {
  // updating a shopping list here
});

shoppingListsRouter.get('/', async (req: any, res: any) => {
  console.log('/shopping-lists/ GET request recieved');

  const shoppingLists = await db().select().from('shopping_list');

  const shoppingListIds = shoppingLists.map(
    (shoppingList: ShoppingList) => shoppingList.id
  );

  const queriedRecipes = await getShoppingListRecipes(shoppingListIds);
  // console.log('QUERIED RECIPES', queriedRecipes);

  const shoppingListsWithRecipes = shoppingLists.map(
    (shoppingList: ShoppingList) => {
      const recipeIds: Array<number> = [];
      let totalServings = 0;
      const shoppingListRecipes = queriedRecipes
        .filter((recipe) => recipe.shopping_list_id === shoppingList.id)
        .map(({ recipe_id, recipe_name, shopping_list_servings, recipe_servings }) => {
          recipeIds.push(recipe_id);
          totalServings += shopping_list_servings;
          return { id: recipe_id, name: recipe_name, servings: shopping_list_servings, recipeServings: recipe_servings };
        });

      // building the shopping lists with recipes object
      const shoppingListWithRecipes = {
        id: shoppingList.id,
        name: shoppingList.name,
        recipes: shoppingListRecipes,
        recipeIds,
        totalServings,
      };
      return shoppingListWithRecipes;
    }
  );

  const allRecipeIds: Set<number> = new Set(
    shoppingListsWithRecipes
      .flatMap(
        (shoppingListWithRecipes: ShoppingListWithRecipes) =>
          shoppingListWithRecipes.recipeIds
      )
  );

  const allIngredients = await getRecipeIngredients(Array.from(allRecipeIds));

  const shoppingListsWithRecipesAndIngredients = shoppingListsWithRecipes.map(
    (shoppingListWithRecipes: ShoppingListWithRecipes) => {
      const shoppingListingredients = allIngredients
        .filter((ingredient) =>
          shoppingListWithRecipes.recipeIds.includes(ingredient.recipe_id)
        )
        .map((ingredientResponse) => {
          console.log('INGREDIENT RESPONSE', ingredientResponse);
          
          const ingredientRecipe = shoppingListWithRecipes.recipes.find(recipe => recipe.id === ingredientResponse.recipe_id)
          let ingredientMultiplier = 1
          if (ingredientRecipe)
            ingredientMultiplier = ingredientRecipe.servings / ingredientRecipe.recipeServings
          
          const {
            ingredient_id,
            name,
            category,
            recipe_number_of,
            recipe_measurement_unit,
            recipe_id,
          } = ingredientResponse;
          ingredientResponse.recipe_number_of = recipe_number_of * ingredientMultiplier

          const derivedCost = deriveCost(ingredientResponse);

          return {
            id: ingredient_id,
            name,
            category,
            derivedCost,
            numberOf: recipe_number_of * ingredientMultiplier,
            unit: recipe_measurement_unit,
            recipeId: recipe_id,
          };
        });

      // TODO  need to get the shoppinglistIngredients collapsed/compressed here
      const shoppingListCost = formatAsFloat2DecimalPlaces(sumBy(shoppingListingredients, 'derivedCost'));
      const shoppingListWithRecipesAndIngredients = {
        id: shoppingListWithRecipes.id,
        name: shoppingListWithRecipes.name,
        servings: shoppingListWithRecipes.totalServings,
        cost: shoppingListCost,
        recipes: shoppingListWithRecipes.recipes,
        ingredients: shoppingListingredients,
      };
      return shoppingListWithRecipesAndIngredients;
    }
  );
  res.send(shoppingListsWithRecipesAndIngredients);
});

shoppingListsRouter.get('/:id', async (req: any, res: any) => {
  console.log('/shopping-lists/:id GET request recieved');
  const { id } = req.params;

  try {
    const result = await db()
      .select()
      .from('shopping_list as sl')
      .where('sl.id', id);

    if (!result.length) {
      return res.status(404).send('No such shopping list');
    }
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

shoppingListsRouter.delete('/:id', async (req: any, res: any) => {
  // deleting a shopping list
});

module.exports = shoppingListsRouter;
export { };
