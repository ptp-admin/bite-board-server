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
        .map((recipeResponse) => {
          const { recipe_id, recipe_name, servings } = recipeResponse;

          recipeIds.push(recipe_id);
          totalServings += servings;
          return { id: recipe_id, name: recipe_name, servings: servings };
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
      .map(
        (shoppingListWithRecipes: ShoppingListWithRecipes) =>
          shoppingListWithRecipes.recipeIds
      )
      .flat()
  );

  const allIngredients = await getRecipeIngredients(Array.from(allRecipeIds));

  const shoppingListsWithRecipesAndIngredients = shoppingListsWithRecipes.map(
    (shoppingListWithRecipes: ShoppingListWithRecipes) => {
      const shoppingListingredients = allIngredients
        .filter((ingredient) =>
          shoppingListWithRecipes.recipeIds.includes(ingredient.recipe_id)
        )
        .map((ingredientResponse) => {
          const {
            ingredient_id,
            name,
            category,
            number_of,
            recipe_measurement_unit,
            recipe_id,
          } = ingredientResponse;

          return {
            id: ingredient_id,
            name,
            category,
            derivedCost: 'Going to have to calculate this',
            numberOf: number_of,
            unit: recipe_measurement_unit,
            recipeId: recipe_id,
          };
        });

      // TODO  need to get the shoppinglistIngredients collapsed/compressed here

      const shoppingListWithRecipesAndIngredients = {
        id: shoppingListWithRecipes.id,
        name: shoppingListWithRecipes.name,
        servings: shoppingListWithRecipes.totalServings,
        cost: 'going to need to calculate this - maybe from total derived costs',
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
export {};
