import type {
  DbShoppingList,
  DbShoppingListRecipe,
  Recipe,
  ShoppingList,
  ShoppingListRecipe,
  ShoppingListWithRecipes,
} from '../types/data';
import { getRecipeIngredients } from '../utils/recipes';
import {
  getShoppingListRecipes,
  getShoppingListsRecipesWithIngredients,
} from '../utils/shoppingLists';
import { deriveCost, formatAsFloat2DecimalPlaces } from './recipes';
import { sumBy } from 'lodash';

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

  const { name, recipeServings } = req.body;
  console.log(name, recipeServings);

  try {
    await db.transaction(async (trx: any) => {
      const [shoppingListId] = await db
        .insert({ name })
        .returning('id')
        .into('shopping_list')
        .transacting(trx);

      if (recipeServings) {
        const recipePromises = recipeServings.map(
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
  console.log('/shopping-lists/:id/add-recipe/ POST request received');
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

shoppingListsRouter.put('/:id', async (req: any, res: any) => {
  // updating a shopping list here
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
        const successMessage = `Successfully updated name for recipe/${id}`;
        console.log(successMessage);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating data.' });
    }
  }

  // PUT IN A TRXN

  // recipes from DB
  const dbExistingRecipes = await db
    .select()
    .from('shopping_list_recipe')
    .where('shopping_list_id', id);

  // recipes from payload
  const { recipes } = req.body;

  // Group existing by recipes id for faster lookup
  const payloadRecipesById = _.groupBy(recipes, 'id');
  const dbExistingRecipesById = _.groupBy(dbExistingRecipes, 'recipe_id');

  const recipesToAdd: Recipe[] = recipes.filter(
    (recipe: Recipe) => !dbExistingRecipesById[`${recipe.id}`]
  );

  const recipesToDelete: DbShoppingListRecipe[] = dbExistingRecipes.filter(
    (recipe: DbShoppingListRecipe) => !payloadRecipesById[`${recipe.recipe_id}`]
  );

  // TODO work out why transactions aren't working
  await db.transaction(async (trx: any) => {
    // add recipes that are missing from the db
    try {
      recipesToAdd.forEach(async (recipe) => {
        await db('shopping_list_recipe').insert({
          shopping_list_id: id,
          recipe_id: recipe.id,
          servings: recipe.servings,
        });
        console.log(
          `Successfully added recipe/${recipe.id}/ to shopping-list/${id}/`
        );
      });
      console.log(`Successfully added recipes to shopping-list/${id}`);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while inserting data.' });
    }

    // delete recipes that are missing from the payload
    try {
      recipesToDelete.forEach(async (recipe) => {
        await db('shopping_list_recipe')
          .where({
            shopping_list_id: id,
            recipe_id: recipe.recipe_id,
          })
          .del();
        console.log(
          `Successfully deleted recipe/${recipe.recipe_id}/ from shopping-list/${id}/`
        );
      });
      console.log(`Successfully deleted recipes to shopping-list/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting data.' });
    }

    // update servings for all recipes in payload
    try {
      recipes.forEach(async (recipe: Recipe) => {
        await db('shopping_list_recipe')
          .update('servings', recipe.servings)
          .where({
            shopping_list_id: id,
            recipe_id: recipe.id,
          });
      });
      const successMessage = `Successfully updated recipe servings for shopping-list/${id}`;
      console.log(successMessage);
      res.send(`Successfully updated shopping-list/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating data.' });
    }
  });
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
