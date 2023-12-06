import type { ShoppingList, ShoppingListRecipe } from '../types/data';
import { getShoppingListsRecipesWithIngredients } from '../utils/shoppingLists';

const shoppingListsRouter = require('express').Router();
const db = require('../utils/database');
const _ = require('lodash');

const UPDATE_RESPONSE_CODES = {
  SUCCESS: 1,
  FAILURE: 0,
};

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

  const { name, shoppingListRecipes } = req.body;
  console.log(name, shoppingListRecipes);

  try {
    await db.transaction(async (trx: any) => {
      const [shoppingListId] = await db
        .insert({ name })
        .returning('id')
        .into('shopping_list')
        .transacting(trx);

      if (shoppingListRecipes) {
        const recipePromises = shoppingListRecipes.map(
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

shoppingListsRouter.post('/:id/recipes/', async (req: any, res: any) => {
  console.log('/shopping-lists/:id/recipes/ POST request received');
  const shoppingListId = req.params.id;
  const { recipeId, servings } = req.body;

  try {
    const result = await db('shopping_list_recipe').insert({
      shopping_list_id: shoppingListId,
      recipe_id: recipeId,
      servings: servings,
    });
    const successMessage = `Successfully added recipe/${recipeId}/ to shopping-list/${shoppingListId}/`;
    console.log(successMessage);
    res.send(successMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while inserting data.' });
  }
});

shoppingListsRouter.delete(
  '/:shoppingListId/recipes/:recipeId',
  async (req: any, res: any) => {
    const { shoppingListId, recipeId } = req.params;
    console.log(
      `/shopping-lists/${shoppingListId}/recipes/${recipeId} DELETE request recieved`
    );
    try {
      await db('shopping_list_recipe')
        .where({
          shopping_list_id: shoppingListId,
          recipe_id: recipeId,
        })
        .del();
      console.log(
        `Successfully deleted recipe/${recipeId}/ from shopping-list/${shoppingListId}/`
      );
      res.send(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting data.' });
    }
  }
);

shoppingListsRouter.put(
  '/:shoppingListId/recipes/:recipeId',
  async (req: any, res: any) => {
    const { shoppingListId, recipeId } = req.params;
    const { servings } = req.body;
    console.log(
      `/shopping-lists/${shoppingListId}/recipes/${recipeId} PUT request recieved`
    );
    try {
      await db('shopping_list_recipe').update('servings', servings).where({
        shopping_list_id: shoppingListId,
        recipe_id: recipeId,
      });
      const successMessage = `Successfully updated recipe servings for:\nshopping-list: ${shoppingListId}\nrecipe: ${recipeId}\nservings: ${servings}`;
      console.log(successMessage);
      res.send(successMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating data.' });
    }
  }
);

shoppingListsRouter.put('/:id/', async (req: any, res: any) => {
  const { id } = req.params;
  console.log(`/shopping-lists/${id} put request received`);

  // update the name
  if (req.body.name) {
    try {
      const response = await db('shopping_list')
        .update({ name: req.body.name })
        .where({
          id,
        });
      if (response === UPDATE_RESPONSE_CODES.FAILURE) {
        res
          .status(404)
          .json({ error: `Could not find the shopping list with id: ${id}` });
      } else {
        const successMessage = `Successfully updated name for recipe/${id} \nname: ${req.body.name}`;
        console.log(successMessage);
        res.send(successMessage);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating data.' });
    }
  }
});

shoppingListsRouter.get('/', async (req: any, res: any) => {
  console.log('/shopping-lists/ GET request recieved');

  const shoppingLists = await db().select().from('shopping_list');

  const shoppingListIds = shoppingLists.map(
    (shoppingList: ShoppingList) => shoppingList.id
  );

  res.send(
    await getShoppingListsRecipesWithIngredients(shoppingListIds, shoppingLists)
  );
});

shoppingListsRouter.get('/:id', async (req: any, res: any) => {
  console.log('/shopping-lists/:id GET request recieved');
  const { id } = req.params;
  try {
    const shoppingList = await db()
      .select()
      .from('shopping_list as sl')
      .where('sl.id', id);
    const result = await getShoppingListsRecipesWithIngredients(
      [id],
      shoppingList
    );
    res.send(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

shoppingListsRouter.delete('/:id', async (req: any, res: any) => {
  const shoppingListId: number = req.params.id;

  try {
    const existingShoppingList = await db('shopping_list')
      .where('id', shoppingListId)
      .first();

    if (!existingShoppingList) {
      const errorMessage = `A shopping list with ID ${shoppingListId} does not exist`;
      console.log(errorMessage);
      return res.status(404).send(errorMessage);
    }

    await db.transaction(async (trx: any) => {
      // Delete shopping list
      await db('shopping_list')
        .where('id', shoppingListId)
        .del()
        .transacting(trx);

      // Delete associated shopping_list_recipe
      await db('shopping_list_recipe')
        .where('shopping_list_id', shoppingListId)
        .del()
        .transacting(trx);
    });

    const successMessage = `Successfully deleted shopping list with ID ${shoppingListId}`;
    console.log(successMessage);
    res.send(successMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = shoppingListsRouter;
export {};
