import type { Recipe } from '../types/data';

const shoppingListRouter = require('express').Router();
const db = require('../utils/database');

interface DbShoppingList {
  id: number;
  name: string;
  created_at: Date;
}

interface DbShoppingListRecipe {
  shopping_list_id?: number;
  recipe_id: number;
  servings: number;
}

interface ShoppingListRecipe {
  shoppingListId?: number;
  recipeId: number;
  servings: number;
}

interface ShoppingList {
  id?: number;
  name: string;
  shoppingListRecipes?: ShoppingListRecipe[];
  recipes?: Recipe[];
  createdAt?: string;
}

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

shoppingListRouter.post('/', async (req: any, res: any) => {
  console.log('/shoppingList/ POST request received');

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

shoppingListRouter.put('/:id', async (req: any, res: any) => {
  // updating a shopping list here
});

shoppingListRouter.get('/', async (req: any, res: any) => {
  res.send('You got a shopping list!');
  // reading all shopping lists
});

shoppingListRouter.get('/:id', async (req: any, res: any) => {
  // reading a shopping list
});

shoppingListRouter.delete('/:id', async (req: any, res: any) => {
  // deleting a shopping list
});

module.exports = shoppingListRouter;
export {};
