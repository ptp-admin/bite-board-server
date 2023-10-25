import { DbShoppingListRecipe } from '../types/data';
const db = require('../utils/database');

export async function getShoppingListRecipes(
  shoppingListIds: Array<number>
): Promise<DbShoppingListRecipe[]> {
  return await db('shopping_list_recipe as slr')
    .select(
      'slr.shopping_list_id',
      'r.id as recipe_id',
      'r.name as recipe_name',
      'slr.servings'
    )
    .leftJoin('recipe as r', 'r.id', 'slr.recipe_id')
    .whereIn('slr.shopping_list_id', shoppingListIds);
}
