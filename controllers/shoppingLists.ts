import type {
  DbShoppingList,
  DbShoppingListRecipe,
  Recipe,
  ShoppingList,
  ShoppingListRecipe,
  ShoppingListWithRecipes,
} from '../types/data';
import { getRecipeIngredients } from '../utils/recipes';
import { getShoppingListRecipes, getShoppingListsRecipesWithIngredients } from '../utils/shoppingLists';
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

  res.send(await getShoppingListsRecipesWithIngredients(shoppingListIds, shoppingLists));
});

shoppingListsRouter.get('/:id', async (req: any, res: any) => {
  console.log('/shopping-lists/:id GET request recieved');
  const { id } = req.params;
  try {
    const shoppingList = await db()
      .select()
      .from('shopping_list as sl')
      .where('sl.id', id);
    const result = await getShoppingListsRecipesWithIngredients([id], shoppingList)
    res.send(result[0]);
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
