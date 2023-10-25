import { DbRecipeIngredientDetailed } from '../types/data';
const db = require('../utils/database');

export async function getRecipeIngredients(
  recipeIds: Array<number>
): Promise<DbRecipeIngredientDetailed[]> {
  return await db('recipe_ingredient as ri')
    .select(
      'i.id',
      'i.name',
      'i.category',
      'i.cost_per',
      'i.number_of',
      'i.measurement_unit',
      'i.category',
      'ri.recipe_id',
      'ri.number_of as recipe_number_of',
      'ri.measurement_unit as recipe_measurement_unit'
    )
    .leftJoin('ingredient as i', 'i.id', 'ri.ingredient_id')
    .whereIn('ri.recipe_id', recipeIds);
}
