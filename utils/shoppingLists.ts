import { sumBy } from 'lodash';
import { deriveCost, formatAsFloat2DecimalPlaces } from './cost';
import {
  RecipeIngredientJoined,
  ShoppingList,
  ShoppingListDto,
  ShoppingListRecipeDto,
  ShoppingListRecipeIngredientDto,
} from '../types/types';
import { supabase } from './database';
import { logAndReturn } from './error';
import { PostgrestError } from '@supabase/supabase-js';

export const getShoppingLists = async (): Promise<
  ShoppingListDto[] | PostgrestError
> => {
  const { data: shoppingLists, error } = await supabase
    .from('shopping_list')
    .select('*');
  if (error) return logAndReturn(error);

  const shoppingListsWithRecipesAndIngredients = await Promise.all(
    shoppingLists.map(
      async (shoppingList: ShoppingList): Promise<ShoppingListDto> => {
        return getShoppingListById(shoppingList.id);
      }
    )
  );

  return shoppingListsWithRecipesAndIngredients;
};

export const getShoppingListById = async (
  id: string
): Promise<ShoppingListDto> => {
  // Select relevant record from shopping_list_joined view
  const { data: shoppingList, error: shoppingListError } = await supabase
    .from('shopping_list_joined')
    .select('*')
    .eq('id', id)
    .single();
  if (shoppingListError) return logAndReturn(shoppingListError);

  // Select relevant records from shopping_list_recipe_joined view
  const { data: shoppingListRecipes, error: shoppingListRecipesError } =
    await supabase
      .from('shopping_list_recipe_joined')
      .select('*')
      .eq('shoppingListId', shoppingList.id ?? '');
  if (shoppingListRecipesError) return logAndReturn(shoppingListRecipesError);

  // Map records into correct shape for recipes array
  const recipes = shoppingListRecipes.map((recipe): ShoppingListRecipeDto => {
    const { recipeId, name, servings, recipeServings } = recipe;
    return {
      id: recipeId ?? '',
      name: name ?? '',
      servings: servings ?? 0,
      recipeServings: recipeServings ?? 0,
    };
  });

  // Select relevant records from recipe_ingredient_joined view
  const shoppingListIngredients = await Promise.all<RecipeIngredientJoined[]>(
    shoppingListRecipes.map(async ({ recipeId }) => {
      const { data: shoppingListIngredientsJoined, error } = await supabase
        .from('recipe_ingredient_joined')
        .select('*')
        .eq('recipeId', recipeId ?? '');
      if (error) return logAndReturn(error);
      return shoppingListIngredientsJoined;
    })
  );

  // Map records into correct shape for ingredients array
  const ingredients = shoppingListIngredients.flatMap(
    (ingredients): ShoppingListRecipeIngredientDto[] => {
      return ingredients.map((ingredient) => {
        // Grab the relevant recipe that the ingredient is from
        const ingredientRecipe = shoppingListRecipes.find(
          (recipe) => recipe.recipeId === ingredient.recipeId
        );
        // If the recipe has a scaleMultiplier, multiply the recipeNumberOf by that value
        if (ingredientRecipe && ingredientRecipe.scaleMultiplier) {
          ingredient.recipeNumberOf =
            (ingredient.recipeNumberOf ?? 1) * ingredientRecipe.scaleMultiplier;
        }
        const { id, name, recipeId, ...rest } = ingredient;
        return {
          id: id ?? '',
          name: name ?? '',
          recipeId: recipeId ?? '',
          ...rest,
          derivedCost: deriveCost(ingredient),
        };
      });
    }
  );

  // Put it all together and return the ShoppingListDto object
  const { id: listId, name, ...rest } = shoppingList;
  return {
    id: id ?? '',
    name: name ?? '',
    ...rest,
    cost: formatAsFloat2DecimalPlaces(sumBy(ingredients, 'derivedCost')),
    recipes,
    ingredients,
  };
};
