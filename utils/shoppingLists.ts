import { sumBy } from 'lodash';
import {
  deriveCost,
  formatAsFloat2DecimalPlaces,
} from '../controllers/recipes';
import {
  DbShoppingListIngredient,
  DbShoppingListRecipes,
  ShoppingListIngredient,
} from '../types/data';
import { getRecipeIngredients } from './recipes';
import type {
  DbShoppingList,
  ShoppingList,
  ShoppingListWithRecipes,
} from '../types/data';
const db = require('../utils/database');

export const getShoppingListRecipes = async (
  shoppingListIds: Array<number>
): Promise<DbShoppingListRecipes[]> => {
  return await db('shopping_list_recipe as slr')
    .select(
      'slr.shopping_list_id',
      'r.id as recipe_id',
      'r.name as recipe_name',
      'slr.servings as shopping_list_servings',
      'r.servings as recipe_servings'
    )
    .leftJoin('recipe as r', 'r.id', 'slr.recipe_id')
    .whereIn('slr.shopping_list_id', shoppingListIds);
};

export const getShoppingListsRecipesWithIngredients = async (
  shoppingListIds: number[],
  shoppingLists: DbShoppingList[]
) => {
  const queriedRecipes = await getShoppingListRecipes(shoppingListIds);

  const shoppingListsWithRecipes = shoppingLists.map(
    (shoppingList: ShoppingList) => {
      const recipeIds: Array<number> = [];
      let totalServings = 0;
      const shoppingListRecipes = queriedRecipes
        .filter((recipe) => recipe.shopping_list_id === shoppingList.id)
        .map(
          ({
            recipe_id,
            recipe_name,
            shopping_list_servings,
            recipe_servings,
          }) => {
            recipeIds.push(recipe_id);
            totalServings += shopping_list_servings;
            return {
              id: recipe_id,
              name: recipe_name,
              servings: shopping_list_servings,
              recipeServings: recipe_servings,
            };
          }
        );

      // building the shopping lists with recipes object
      return {
        id: shoppingList.id,
        name: shoppingList.name,
        recipes: shoppingListRecipes,
        recipeIds,
        totalServings,
      };
    }
  );

  const allRecipeIds: Set<number> = new Set(
    shoppingListsWithRecipes.flatMap(
      (shoppingListWithRecipes) => shoppingListWithRecipes.recipeIds
    )
  );

  const allIngredients = await getRecipeIngredients(Array.from(allRecipeIds));

  const shoppingListsWithRecipesAndIngredients = shoppingListsWithRecipes.map(
    (shoppingListWithRecipes) => {
      const shoppingListingredients = allIngredients
        .filter((ingredient) =>
          shoppingListWithRecipes.recipeIds.includes(ingredient.recipe_id)
        )
        .map((ingredientResponse) => {
          const ingredientRecipe = shoppingListWithRecipes.recipes.find(
            (recipe) => recipe.id === ingredientResponse.recipe_id
          );
          let ingredientMultiplier = 1;
          if (ingredientRecipe)
            ingredientMultiplier =
              ingredientRecipe.servings / ingredientRecipe.recipeServings;

          const {
            ingredient_id,
            name,
            category,
            recipe_number_of,
            recipe_measurement_unit,
            recipe_id,
          } = ingredientResponse;
          ingredientResponse.recipe_number_of =
            recipe_number_of * ingredientMultiplier;

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

      const shoppingListCost = formatAsFloat2DecimalPlaces(
        sumBy(shoppingListingredients, 'derivedCost')
      );

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

  return shoppingListsWithRecipesAndIngredients;
};
